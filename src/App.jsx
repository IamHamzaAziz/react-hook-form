import { useForm } from 'react-hook-form'
import EmailInput from './EmailInput'

function App() {
  const {
    register, // to register inputs
    handleSubmit, // to handle form submission
    formState: { errors, isValid }, // for validation errors and button state
    reset, // to reset form
    watch // to watch live values (e.g. for image preview)
  } = useForm({
    mode: "onChange"  // validate while typing (not only on submit)
  })

  const onFormSubmit = (data) => {
    const formData = {
      ...data,
      profileImage: watch("profileImage")[0], // get file object
    }
    console.log("Form Data:", formData)
    reset() // reset the form
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <form onSubmit={handleSubmit(onFormSubmit)} className="bg-white p-6 rounded shadow-md w-full max-w-md space-y-4">
        <h2 className="text-2xl font-bold text-center">Form Using React Hook Form</h2>

        <div>
          <label className="block font-medium">Name</label>
          <input
            type="text"
            {...register("name", {
              required: "Name is required",
              minLength: { value: 3, message: "Name must be at least 3 characters long" }
            })}
            className="w-full border px-3 py-2 rounded mt-1"
          />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}
        </div>

        {/* Input from child component */}
        <EmailInput register={register} errors={errors.email} />

        <div>
          <label className="block font-medium">Password</label>
          <input
            type="password"
            {...register("password", {
              required: "Password is required",
              minLength: { value: 6, message: "Password must be at least 6 characters long" }
            })}
            className="w-full border px-3 py-2 rounded mt-1"
          />
          {errors.password && <p className="text-red-500">{errors.password.message}</p>}
        </div>

        <div>
          <label className="block font-medium mb-1">Gender</label>
          <div className="flex gap-4">
            <label>
              <input type="radio" value="Male" {...register("gender", { required: "Select gender" })} />
              <span className="ml-1">Male</span>
            </label>
            <label>
              <input type="radio" value="Female" {...register("gender")} />
              <span className="ml-1">Female</span>
            </label>
          </div>
          {errors.gender && <p className="text-red-500 text-sm">{errors.gender.message}</p>}
        </div>

        <div>
          <label className="block font-medium mb-1">Hobbies</label>
          <div className="flex gap-4 flex-wrap">
            <label>
              <input type="checkbox" value="Reading" {...register("hobbies", { required: "Select at least one hobby" })} />
              <span className="ml-1">Reading</span>
            </label>
            <label>
              <input type="checkbox" value="Coding" {...register("hobbies")} />
              <span className="ml-1">Coding</span>
            </label>
            <label>
              <input type="checkbox" value="Gaming" {...register("hobbies")} />
              <span className="ml-1">Gaming</span>
            </label>
          </div>
          {errors.hobbies && <p className="text-red-500 text-sm">{errors.hobbies.message}</p>}
        </div>

        <div>
          <label className="block font-medium">Country</label>
          <select
            {...register("country", { required: "Select your country" })}
            className="w-full border px-3 py-2 rounded mt-1"
          >
            <option value="">-- Select --</option>
            <option value="Pakistan">Pakistan</option>
            <option value="USA">USA</option>
            <option value="UK">UK</option>
          </select>
          {errors.country && <p className="text-red-500 text-sm">{errors.country.message}</p>}
        </div>

        <div>
          <label className="block font-medium">Profile Image</label>
          <input
            type="file"
            accept="image/*"
            {...register("profileImage", {
              required: "Profile image is required",
            })}
            className="w-full border px-3 py-2 rounded mt-1"
          />
          {errors.profileImage && (
            <p className="text-red-500 text-sm mt-1">{errors.profileImage.message}</p>
          )}
        </div>

        {/* Image Preview */}
        {watch("profileImage") && watch("profileImage")[0] && (
          <div className="mt-2">
            <p className="font-medium mb-1">Preview:</p>
            <img
              src={URL.createObjectURL(watch("profileImage")[0])}
              alt="Preview"
              className="h-32 w-32 object-cover rounded border"
            />
          </div>
        )}

        {/* Disabled if form or inputs are invalid */}
        <button
          type="submit"
          disabled={!isValid}
          className={
          `w-full py-2 rounded font-semibold transition 
          ${!isValid
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : "bg-blue-500 text-white hover:bg-blue-600"}
          `}
        >
          Submit
        </button>

      </form>
    </div>
  )
}

export default App
