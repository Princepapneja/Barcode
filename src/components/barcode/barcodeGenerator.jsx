import React from 'react'
import Card from '../utils/card'
import InputField from '../utils/InputFields'
import Button from '../utils/button'
import Barcode from 'react-barcode'

const BarcodeGenerator = () => {
    const [barcode, setBarcode] = React.useState('')
    const [barcodeType, setBarcodeType] = React.useState('')

    const handleBarcodeChange = (e) => {
        setBarcode(e.target.value)
    }


    return (
        <section className="p-10 md:p-20 ">
            <div className='container'>
                <Card title="generate barcode">
                    <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
                        <InputField className={"w-[70%] flex-shrink-0"} value={barcode} handleInputChange={handleBarcodeChange}
                            placeholder="type your string ..."
                        />
                        {
                            barcode &&
                            <Barcode value={barcode} options={{ width: 0.5, height: 40, format: 'CODE128', displayValue: false }}
                            />
                        }
                    </div>
                </Card>
            </div>
        </section>
    )
}

export default BarcodeGenerator