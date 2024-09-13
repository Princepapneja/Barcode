import { ChevronDown, Eye, EyeOff, Trash } from "lucide-react";
import { useState, useRef, useEffect } from "react";
// import convertTimeSlot from "../../functions/TimeFormatConverter";
// import Persona from "./persona";

const InputField = ({
  label,
  className,
  isDisable,
  options,
  deleteCta,
  handleOptionClick,
  type = "text",
  id,
  value,
  max,
  handleInputChange,
  placeholder = "",
  handleSpecialChange,
  rows,
  checked, prefix = false
}) => {
  const [showPass, setShowPass] = useState(false)
  const [selectedOptions, setSelectedOptions] = useState(value || []);
  const [selectedOption, setSelectedOption] = useState(value || null);
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);


  const [open, setOpen] = useState(false)
  const handleChange = (e) => {
    const { type, value } = e.target
    if (type === "tel") {
      const numericValue = value.replace(/[^0-9]/g, '');
      e.target.value = numericValue
    }
    handleInputChange && handleInputChange(e)
  }
  const handleSelectChange = (e) => {
    setOpen(true)
    handleSpecialChange && handleSpecialChange(e)
  };
  const handleMultiSelectChange = (option) => {
    const newSelectedOptions = selectedOptions.includes(option)
      ? selectedOptions.filter(item => item !== option)
      : [...selectedOptions, option];
    setSelectedOptions(newSelectedOptions);
    handleInputChange && handleInputChange({ target: { name: id, value: newSelectedOptions } });
  };
  const handleSingleSelectChange = (option) => {
    setSelectedOption(option)
    handleInputChange && handleInputChange({ target: { name: id, value: option.value } });
  };
  const handleOptions = async () => {
    if (!options) return
    if (Array.isArray(options)) {
      setFilteredOptions(options?.filter(option =>
        option?.label?.toLowerCase()?.includes(searchTerm?.toLowerCase())
      ))
    }
    else {
      const data = await options();
      setFilteredOptions(data?.filter(option =>
        option?.label?.toLowerCase()?.includes(searchTerm?.toLowerCase())
      ))
    }
  }


  const handleClickOutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  useEffect(() => {
    handleOptions()
  }, [options, searchTerm])


  return (
    <>
      <div className={`${(type === "textarea" || type === "textEditor") ? "md:col-span-2 xl:col-span-3" : type === "checkbox" ? "flex  gap-1 items-center" : "space-y-2 w-full "} normal-case ${type !== "checkbox" && className}`}>
        {(label && type !== "checkbox") && (
          <label className="capitalize font-medium block whitespace-nowrap" htmlFor={id}>
            {label}
          </label>
        )}

        {type === "multi-select" ? (
          <div className="relative" ref={dropdownRef}>
            <div
              className="grid grid-cols-[1.90fr_0.10fr] gap-2 justify-between bg-transparent border-2 items-center border-primary focus:outline-primary rounded-xl  cursor-pointer"
              onClick={() => setIsOpen(!isOpen)}
            >
              <p className="truncate p-2">{selectedOptions.length > 0
                ? selectedOptions.join(', ')
                : 'Select options'}</p>
              <ChevronDown className="w-4 mr-0.5" />
            </div>
            {isOpen && (
              <div className="absolute z-10 mt-1 w-full bg-white border border-primary rounded-md shadow-lg max-h-60 overflow-auto">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full text-ellipsis  p-2 border-b border-primary"
                />
                <div className="p-2 ">
                  {filteredOptions?.length > 0 ? (
                    filteredOptions.map((option, key) => (
                      <label htmlFor={`${id}-${option.value}`} key={key} className="flex items-center p-2 border-b border-primary">
                        <input
                          type="checkbox"
                          id={`${id}-${option.value}`}
                          value={option.value}
                          checked={selectedOptions.includes(option.value)}
                          onChange={() => handleMultiSelectChange(option.value)}
                          className="mr-2"
                        />
                        <span className="text-sm">{option.label}</span>
                      </label>
                    ))
                  ) : (
                    <div className="text-sm text-gray-500">No options found</div>
                  )}
                </div>
              </div>
            )}
          </div>
        ) :
          type === "single-select" ? (
            <div className="relative" ref={dropdownRef}>
              <div
                className="flex gap-2 justify-between bg-transparent border-2 items-center border-primary focus:outline-primary rounded-xl cursor-pointer"
                onClick={() => setIsOpen(!isOpen)}
              >
                <p className="truncate p-2 ">
                  {selectedOption ? selectedOption.label : 'Select an option'}
                </p>
                <ChevronDown className="w-4 mr-0.5" />
              </div>
              {isOpen && (
                <div className="absolute z-10 mt-1 w-full bg-white border border-primary rounded-md shadow-lg max-h-60 overflow-auto">
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full text-ellipsis p-2 border-b border-primary"
                  />
                  <div className="p-2">
                    {filteredOptions?.length > 0 ? (
                      filteredOptions.map((option, key) => (
                        <label htmlFor={`${id}-${option.value}`} key={key} className={`flex items-center p-2 border-b border-primary  ${selectedOption?.value === option.value && "bg-primary text-white "}`}>
                          <input
                            type="radio"
                            id={`${id}-${option.value}`}
                            name="single-select"
                            value={option.value}
                            checked={selectedOption?.value === option.value}
                            onChange={() => handleSingleSelectChange(option)}
                            className=" hidden"
                          />
                          <span className="text-sm">{option.label}</span>
                        </label>
                      ))
                    ) : (
                      <div className="text-sm text-gray-500">No options found</div>
                    )}
                  </div>
                </div>
              )}
            </div>
          ) :

            type === "select" ? (
              <select
                value={value}
                onChange={handleInputChange}
                name={id}
                id={id}
                className="block w-full bg-transparent p-2 border-2 border-primary placeholder:text-primary focus:outline-primary rounded-xl text-primary">
                {options?.map((option, key) => {
                  return (
                    <option key={key} disabled={option?.disable} value={option?.value}>
                      {option?.name}
                    </option>
                  );
                })}
              </select>
            ) : type === "textarea" ? (
              <textarea
                rows={rows || 5}
                id={id}
                name={id}
                value={value}
                placeholder={placeholder}
                onChange={handleInputChange && handleInputChange}
                className="bg-transparent p-3 text-primary border-2 border-primary  rounded-xl w-full  outline-primary   focus:outline-primary  "></textarea>
            )
              : type === "switch" ?
                <label className="flex justify-end  cursor-pointer text-right">
                  <input type="checkbox" name={id} id={id} onChange={handleInputChange} checked={value} className="sr-only peer" />
                  <div className="relative text-desc w-11 h-6 bg-primary peer-focus:outline-none   rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-primary after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" />
                </label>

                :
                type === "checkbox" ?
                  <div className={`select-none cursor-pointer w-full flex items-center gap-2 rounded-3xl border py-1 px-4 ${className}`}>
                    <input
                      type={type}
                      id={id}
                      name={id}
                      value={value}
                      checked={checked}
                      onChange={handleInputChange}
                      className="h-4 hidden w-4 text-primary"
                    />
                    <label className="capitalize cursor-pointer font-medium block whitespace-nowrap" htmlFor={id}>
                      {label}
                    </label>
                  </div>
                  :
                  type === "special" ?
                    <div className="relative flex border-2 items-center border-primary rounded-xl focus-within:border-2 focus-within:border-primary">
                      <input
                        id={id}
                        type={"text"}
                        name={id}
                        value={value}
                        placeholder={placeholder}
                        onChange={handleSelectChange}
                        className={`accent-primary text-desc bg-transparent leading-0 p-2 w-full placeholder:text-primary focus:outline-none  disabled:bg-gray-200 ${type !== "password" ? "rounded-xl" : "rounded-l-xl"}`}
                        disabled={isDisable}
                      />
                      <ChevronDown className="w-4 h-4" />
                      <div className={`${open ? "visible opacity-100 " : "invisible opacity-0"} absolute top-full w-full  bg-white border rounded-xl`}>
                        {options?.map((option, key) => {
                          return (
                            <button className="w-full text-left p-2 disabled:bg-gray-200 rounded-xl" key={key} disabled={option?.disable} onClick={() => { handleOptionClick && handleOptionClick(option); setOpen(false) }}>
                              {
                                option?.image &&
                                // <Persona path={option?.image} />
                                <img src={option?.image} alt="" className="w-6 h-6 rounded-full" />
                              }
                              {option?.name}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                    : (
                      <div className="flex border-2 items-center border-primary rounded-xl focus-within:border-2 focus-within:border-primary">
                        {
                          prefix && prefix()
                        }
                        <input
                          id={id}
                          type={type === "password" ? (showPass ? "text" : "password") : type}
                          name={id}
                          value={(type === "file" ? null : type === "date" ? value : value)}
                          placeholder={placeholder}
                          checked={checked}
                          maxLength={type === "tel" ? max : undefined}
                          pattern={type === "tel" ? "[0-9]*" : undefined}
                          inputMode={type === "tel" ? "numeric" : undefined}
                          accept={type === "file" ? "image/*" : undefined}
                          onChange={handleChange}
                          className={`accent-primary text-primary bg-transparent leading-0 p-2 w-full placeholder:text-primary focus:outline-none disabled:text-gray-500 disabled:bg-gray-200 ${type === "password" ? "rounded-l-xl" : prefix ? "rounded-r-xl" : "rounded-xl"}`}
                          disabled={isDisable}
                        />

                        {
                          deleteCta && <div onClick={deleteCta} className=" cursor-pointer bg-red-500 p-2 rounded-r-xl text-white">

                            <Trash />
                          </div>
                        }
                        {type === "password" &&
                          <button type="button" onClick={() => setShowPass(!showPass)} className="bg-primary text-white cursor-pointer p-2 rounded-r-lg">
                            {showPass ? <Eye /> : <EyeOff />}
                          </button>
                        }
                      </div>


                    )}

      </div>
    </>
  );
};

export default InputField;
