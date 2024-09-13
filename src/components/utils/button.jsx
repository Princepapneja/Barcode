import { useState } from "react"
import MiniLoader from "./miniLoader"

// eslint-disable-next-line react/prop-types
const Button = ({ type = "sp-primary", children, spinner = false, disabled, big = false, className, onClick }) => {
  const [loading, setLoading] = useState(false)
  const handleClick = async () => {

    setLoading(true)
    onClick && await onClick()
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }
  return (
    <>
      <button disabled={disabled} onClick={handleClick}
        className={`relative capitalize ${big ? "text-lg px-8 py-5" : "text-sm py-2 px-7"} 
          special-btn relative text-primary-foreground text-sm font-bold z-[1] rounded-[2rem] px-7 py-4 select-none leading-none
              ${type === "sp-light" ? "bg-light-gradient before:bg-light-before !text-primary shadow-custom-light" : type === "sp-success" ? "bg-success-gradient before:bg-success-before shadow-custom-success" : type === "sp-primary" ? "bg-custom-gradient before:bg-primary-before shadow-custom-primary" : type === "sp-danger" ? "bg-danger-gradient before:bg-danger-before shadow-custom-danger" :
            type === "border" ? "text-primary  border border-primary border-solid disabled:opacity-70 disabled:text-desc" : type === "danger" ? "bg-danger text-white" : "bg-primary text-white"}
             ${className} disabled:opacity-50`}>
        {
          spinner &&
          <span className="absolute left-2 top-3 ">
            {
              loading && <MiniLoader />
            }
          </span>
        }
        {children}
      </button>

    </>
  )
}

export default Button