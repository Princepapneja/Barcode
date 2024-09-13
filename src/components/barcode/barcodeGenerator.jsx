import React, { useState, useEffect, useRef } from 'react';
import Barcode from 'react-barcode';

const BarcodeGenerator = () => {
    const [inputValue, setInputValue] = useState('SPACE-MOTOEDGE50F5G-PURPLE');
    const [barcodeScale, setBarcodeScale] = useState(1);
    const barcodeRef = useRef(null);

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    useEffect(() => {
        const adjustBarcodeScale = () => {
            if (barcodeRef.current) {
                const containerWidth = barcodeRef.current.parentElement.offsetWidth;
                const barcodeWidth = barcodeRef.current.offsetWidth;
                const scale = containerWidth / barcodeWidth;
                setBarcodeScale(scale < 1 ? scale : 1);
            }
        };

        adjustBarcodeScale();
        window.addEventListener('resize', adjustBarcodeScale);

        return () => {
            window.removeEventListener('resize', adjustBarcodeScale);
        };
    }, [inputValue]);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-2">
            {/* Card 1: Input Field */}
            <div>
                <div className="bg-white shadow-md rounded p-6">
                    <h1 className="text-2xl font-bold mb-6">Barcode Generator</h1>
                    <input
                        type="text"
                        placeholder="Enter text to generate barcode"
                        value={inputValue}
                        onChange={handleInputChange}
                        className="border border-gray-400 p-2 rounded mb-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
            </div>

            {/* Card 2: Barcode */}
            {inputValue && (
                <div className="bg-white shadow-md rounded md:p-6 px-1">
                    <div className="md:p-2 w-full">
                        <div
                            ref={barcodeRef}
                            style={{
                                transform: `scale(${barcodeScale})`,
                                transformOrigin: 'center',
                                width: '100%',
                                display: 'flex',
                                justifyContent: 'center'
                            }}
                        >
                            <Barcode value={inputValue} />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BarcodeGenerator;
