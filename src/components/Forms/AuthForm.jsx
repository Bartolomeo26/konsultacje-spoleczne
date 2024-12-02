import { useState } from "react";
import { Mail, Lock, Eye, EyeOff, User, Calendar } from "lucide-react";

function AuthForm({ inputData, onSubmit, children })
{
    const [visibility, setVisibility] = useState({
        password: false,
        confirmPassword: false
    });

    const [formData, setFormData] = useState({
        name: '',
        surname: '',
        email: '',
        birthDate: '',
        password: '',
        confirmPassword: ''
    });

    const [touched, setTouched] = useState({
        name: false,
        surname: false,
        email: false,
        birthDate: false,
        password: false,
        confirmPassword: false
    });

    function handleInputChange(type, value)
    {
        setFormData(prevData => ({
            ...prevData,
            [type]: value
        }));
    }

    function handleInputBlur(type)
    {
        setTouched(prevTouched => ({
            ...prevTouched,
            [type]: true
        }));
    }

    function changeVisibility(type)
    {
        setVisibility(prevVisibility => ({
            ...prevVisibility,
            [type]: !prevVisibility[type]
        }));
    }

    function handleSubmit(event)
    {
        event.preventDefault();

        // Validation
        const emailIsValid = formData.email.includes('@');
        const passwordIsValid = formData.password.length >= 7;
        const passwordsMatch = formData.password === formData.confirmPassword;
        const nameIsValid = formData.name.trim().length > 0;
        const surnameIsValid = formData.surname.trim().length > 0;

        if (!emailIsValid || !passwordIsValid || !passwordsMatch || !nameIsValid || !surnameIsValid)
        {
            return;
        }

        const formDataToSubmit = new FormData(event.target);
        const data = Object.fromEntries(formDataToSubmit);
        onSubmit(data);
    }

    // Validation error checks
    const emailError = touched.email && !formData.email.includes('@');
    const passwordError = touched.password && formData.password.length < 7;
    const confirmPasswordError = touched.confirmPassword && formData.password !== formData.confirmPassword;
    const nameError = touched.name && formData.name.trim().length === 0;
    const surnameError = touched.surname && formData.surname.trim().length === 0;

    return (
        <form autoComplete="off"
            id="signup-form"
            onSubmit={handleSubmit}
            className="mb-2 flex flex-col items-center justify-center w-full"
        >
            <div className="flex gap-3 w-11/12">
                <div className="mb-6 w-1/2">
                    <label
                        htmlFor="name"
                        className="block mb-2 text-sm font-medium text-gray-900"
                    >
                        Name
                    </label>
                    <div className="relative">
                        <input
                            className={`bg-gray-50 border ${nameError ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pl-10`}
                            type="text"
                            id="name"
                            name="name"
                            required
                            placeholder="John"
                            value={formData.name}
                            onChange={(e) => handleInputChange('name', e.target.value)}
                            onBlur={() => handleInputBlur('name')}
                            defaultValue={inputData?.name ?? ''}
                            maxLength={20}
                        />
                        <User
                            className="absolute w-5 h-5 top-3 left-3 text-slate-600"
                        />
                    </div>
                    {nameError && <p className="text-sm text-red-600 mt-1">Please enter a valid name</p>}
                </div>

                <div className="mb-6 w-1/2">
                    <label
                        htmlFor="surname"
                        className="block mb-2 text-sm font-medium text-gray-900"
                    >
                        Surname
                    </label>
                    <div className="relative">
                        <input
                            className={`bg-gray-50 border ${surnameError ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pl-10`}
                            type="text"
                            id="surname"
                            name="surname"
                            required
                            placeholder="Smith"
                            value={formData.surname}
                            onChange={(e) => handleInputChange('surname', e.target.value)}
                            onBlur={() => handleInputBlur('surname')}
                            defaultValue={inputData?.surname ?? ''}
                            maxLength={30}
                        />
                        <User
                            className="absolute w-5 h-5 top-3 left-3 text-slate-600"
                        />
                    </div>
                    {surnameError && <p className="text-sm text-red-600 mt-1">Please enter a valid surname</p>}
                </div>
            </div>

            <div className="flex gap-3 w-11/12">
                <div className="mb-6 w-1/2">
                    <label
                        htmlFor="email"
                        className="block mb-2 text-sm font-medium text-gray-900"
                    >
                        Email
                    </label>
                    <div className="relative">
                        <input
                            className={`bg-gray-50 border ${emailError ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pl-10`}
                            type="email"
                            id="email"
                            name="email"
                            required
                            placeholder="john@example.com"
                            value={formData.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            onBlur={() => handleInputBlur('email')}
                            defaultValue={inputData?.email ?? ''}
                        />
                        <Mail
                            className="absolute w-5 h-5 top-3 left-3 text-slate-600"
                        />
                    </div>
                    {emailError && <p className="text-sm text-red-600 mt-1">Please enter a valid email</p>}
                </div>

                <div className="mb-6 w-1/2">
                    <label
                        htmlFor="birthDate"
                        className="block mb-2 text-sm font-medium text-gray-900"
                    >
                        Birth Date
                    </label>
                    <div className="relative">
                        <input
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pl-10"
                            type="date"
                            id="birthDate"
                            name="birthDate"
                            value={formData.birthDate}
                            onChange={(e) => handleInputChange('birthDate', e.target.value)}
                            defaultValue={inputData?.birthDate ?? ''}
                        />
                        <Calendar
                            className="absolute w-5 h-5 top-3 left-3 text-slate-600"
                        />
                    </div>
                </div>
            </div>

            <div className="flex gap-3 w-11/12">
                <div className="mb-6 w-1/2">
                    <label
                        htmlFor="password"
                        className="block mb-2 text-sm font-medium text-gray-900"
                    >
                        Password
                    </label>
                    <div className="relative">
                        <input
                            className={`bg-gray-50 border ${passwordError ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pl-10 pr-10`}
                            type={visibility.password ? 'text' : 'password'}
                            id="password"
                            name="password"
                            required
                            placeholder="Password"
                            value={formData.password}
                            onChange={(e) => handleInputChange('password', e.target.value)}
                            onBlur={() => handleInputBlur('password')}
                            defaultValue={inputData?.password ?? ''}
                            maxLength={20}
                        />
                        <Lock
                            className="absolute w-5 h-5 top-3 left-3 text-slate-600"
                        />
                        {!visibility.password ? (
                            <EyeOff
                                onClick={() => changeVisibility('password')}
                                className="absolute w-5 h-5 top-3 right-3 z-10 text-slate-600 cursor-pointer hover:text-slate-900 transition-colors"
                            />
                        ) : (
                            <Eye
                                onClick={() => changeVisibility('password')}
                                className="absolute w-5 h-5 top-3 right-3 z-10 text-slate-600 cursor-pointer hover:text-slate-900 transition-colors"
                            />
                        )}
                    </div>
                    {passwordError && <p className="text-sm text-red-600 mt-1">Password must be at least 7 characters</p>}
                </div>

                <div className="mb-6 w-1/2">
                    <label
                        htmlFor="confirmPassword"
                        className="block mb-2 text-sm font-medium text-gray-900"
                    >
                        Confirm Password
                    </label>
                    <div className="relative">
                        <input
                            className={`bg-gray-50 border ${confirmPasswordError ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pl-10 pr-10`}
                            type={visibility.confirmPassword ? 'text' : 'password'}
                            id="confirmPassword"
                            name="confirmPassword"
                            required
                            placeholder="Confirm password"
                            value={formData.confirmPassword}
                            onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                            onBlur={() => handleInputBlur('confirmPassword')}
                            maxLength={20}
                        />
                        <Lock
                            className="absolute w-5 h-5 top-3 left-3 text-slate-600"
                        />
                        {!visibility.confirmPassword ? (
                            <EyeOff
                                onClick={() => changeVisibility('confirmPassword')}
                                className="absolute w-5 h-5 top-3 right-3 z-10 text-slate-600 cursor-pointer hover:text-slate-900 transition-colors"
                            />
                        ) : (
                            <Eye
                                onClick={() => changeVisibility('confirmPassword')}
                                className="absolute w-5 h-5 top-3 right-3 z-10 text-slate-600 cursor-pointer hover:text-slate-900 transition-colors"
                            />
                        )}
                    </div>
                    {confirmPasswordError && <p className="text-sm text-red-600 mt-1">Passwords must match</p>}
                </div>
            </div>

            <div className="flex justify-center w-1/2">
                <p className="form-actions">{children}</p>
            </div>
        </form>
    );
}

export default AuthForm;