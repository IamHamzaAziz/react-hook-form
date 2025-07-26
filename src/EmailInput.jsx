import React from 'react'

const EmailInput = ({ register, errors }) => {
    return (
        <div>
            <label className="block font-medium">Email</label>
            <input
                type="email"
                {...register("email", {
                    required: "Email is required",
                    pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Invalid email format" }
                })}
                className="w-full border px-3 py-2 rounded mt-1"
            />
            {errors && <p className="text-red-500">{errors.message}</p>}
        </div>
    )
}

export default EmailInput