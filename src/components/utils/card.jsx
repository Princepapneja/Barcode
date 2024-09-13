/* eslint-disable react/prop-types */

import { forwardRef } from "react"

const Card = forwardRef(({ children, title, desc, style, className }, ref) => {
  return (
    <>
      <div style={style} ref={ref} className={`bg-white p-4 md:p-8 rounded-3xl shadow-card-2 w-full ${className}`}>
        <div className={`card-child`}>
          <span className="text-primary capitalize text-3xl font-bold">{title}</span>
          {
            desc &&
            <p className="text-desc text-sm">{desc}</p>
          }
        </div>
        {children}
      </div>
    </>
  )
})

export default Card