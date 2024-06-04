import React from 'react'

function OrderItems({props}) {
    console.log("props");
  return (
    <>
    <tr>
                <td></td>
                <td>
                  <div className="flex items-center gap-8">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img
                          src="https://img.daisyui.com/tailwind-css-component-profile-2@56w.png"
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                  </div>
                </td>
                <td>Zemlak, Daniel and Leannon</td>
                <td>1</td>
                <td>200</td>
                <td>
                  <button className="btn btn-ghost btn-md bg-red text-white">
                    Delete
                  </button>
                </td>
              </tr>
    </>
  )
}

export default OrderItems