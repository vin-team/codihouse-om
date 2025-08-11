import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { changeError, clearActionState, login } from '@/slices/authSlice';
import { getUser, clearActionState as userClearActionState } from '@/slices/userSlice';
import { setLogined } from '@/slices/app';
import { useToastContext } from '@/contexts/ToastContext';
import { useRouter } from 'next/dist/client/router';
import Link from 'next/dist/client/link';

interface LoginProps { }

interface LoginFormValues {
  email: string;
  password: string;
  rememberMe: boolean;
}

const Login: React.FC<LoginProps> = ({ }) => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const { success, error } = useToastContext();

  const dispatch = useAppDispatch();
  const authActionState = useAppSelector(state => state.auth.actionState);
  const userActionState = useAppSelector(state => state.user.actionState);

  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Email không hợp lệ, vui lòng nhập địa chỉ email chính xác.')
      .required('Email không được để trống'),
    password: Yup.string()
      .min(4, 'Mật khẩu phải có ít nhất 4 ký tự')
      .required('Mật khẩu không được để trống'),
  });

  const initialValues: LoginFormValues = {
    email: '',
    password: '',
    rememberMe: false,
  };

  const handleSubmit = async (values: LoginFormValues) => {
    await dispatch(login(values));
  };

  useEffect(() => {
    dispatch(changeError(""));
    dispatch(clearActionState());
    dispatch(userClearActionState());
  }, [dispatch]);

  useEffect(() => {
    if (authActionState?.type === 'login') {
      switch (authActionState?.status) {
        case 'loading':
          break;
        case 'completed':
          if (!userActionState.status || userActionState.status === 'idle') {
            dispatch(getUser());
          }
          break;
        case 'failed':
          error('Đăng nhập thất bại!', authActionState.error)
          dispatch(clearActionState());
          break;
      }
    }
  }, [authActionState, userActionState.status])

  useEffect(() => {
    if (userActionState?.type === 'getUser') {
      switch (userActionState?.status) {
        case 'loading':
          break;
        case 'completed':
          dispatch(clearActionState());
          dispatch(userClearActionState());
          dispatch(setLogined(true))
          success('Đăng nhập thành công!')
          router.push('/dashboard');
          break;
      }
    }
  }, [userActionState])

  return (
    <div className='min-h-[calc(100vh-32px)] flex flex-col justify-center items-center'>
      {/* Login Form */}
      <div className="flex flex-col items-center space-y-8">
        <div className="max-w-2xl w-full">
          <div className="bg-white rounded-lg border border-gray-200 p-8">
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}>
              {({ values, errors, touched, setFieldValue }) => (
                <>
                  <div className="text-center mb-6">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                      Chào mừng trở lại
                    </h2>
                    <p className="text-gray-600 text-sm">
                      {Object.keys(errors).length > 0
                        ? "Vui lòng nhập thông tin đăng nhập của bạn để đăng nhập."
                        : "Vui lòng nhập thông tin đăng nhập của bạn."
                      }
                    </p>
                  </div>

                  <Form className="flex flex-col space-y-8 w-96">
                    {/* Email Field */}
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email
                      </label>
                      <Field
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        className={`appearance-none relative block w-full px-3 py-2 border rounded-md
                            text-gray-900 focus:outline-none focus:ring-2 focus:ring-white focus:border-primary-300 sm:text-sm 
                            ${errors.email && touched.email ? 'border-red-500' : 'border-gray-300'}`}
                        placeholder="Nhập email của bạn"
                      />
                      <ErrorMessage
                        name="email"
                        component="p"
                        className="mt-2 text-sm text-red-500"
                      />
                    </div>

                    {/* Password Field */}
                    <div>
                      <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                        Mật khẩu
                      </label>
                      <div className="relative">
                        <Field
                          id="password"
                          name="password"
                          type={showPassword ? 'text' : 'password'}
                          autoComplete="current-password"
                          className={`appearance-none relative block w-full px-3 py-2 pr-10 border rounded-md 
                              text-gray-900 focus:outline-none focus:ring-2 focus:ring-white focus:border-primary-300 sm:text-sm 
                              ${errors.password && touched.password ? 'border-red-500' : 'border-gray-300'}`}
                          placeholder="Nhập mật khẩu của bạn"
                        />
                        <button
                          type="button"
                          className="absolute inset-y-0 right-0 pr-3 flex items-center"
                          onClick={() => setShowPassword(!showPassword)}>
                          {showPassword ? (
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M10.7329 5.07599C13.0623 4.7984 15.4185 5.29081 17.4418 6.47804C19.465 7.66527 21.0441 9.48207 21.9379 11.651C22.0213 11.8755 22.0213 12.1225 21.9379 12.347C21.5704 13.238 21.0847 14.0755 20.4939 14.837M14.0839 14.158C13.5181 14.7045 12.7603 15.0069 11.9737 15C11.1871 14.9932 10.4347 14.6777 9.87844 14.1215C9.32221 13.5652 9.0067 12.8128 8.99987 12.0262C8.99303 11.2396 9.29542 10.4818 9.84189 9.91602M17.479 17.499C16.1525 18.2848 14.6725 18.776 13.1394 18.9394C11.6063 19.1028 10.056 18.9345 8.59365 18.4459C7.13133 17.9573 5.79121 17.1599 4.66423 16.1078C3.53725 15.0556 2.64977 13.7734 2.06202 12.348C1.97868 12.1235 1.97868 11.8765 2.06202 11.652C2.94865 9.50189 4.50869 7.69728 6.50802 6.50903M2 2L22 22" stroke="#0F172B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          ) : (
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M2.06202 12.3481C1.97868 12.1236 1.97868 11.8766 2.06202 11.6521C2.87372 9.68397 4.25153 8.00116 6.02079 6.81701C7.79004 5.63287 9.87106 5.00073 12 5.00073C14.129 5.00073 16.21 5.63287 17.9792 6.81701C19.7485 8.00116 21.1263 9.68397 21.938 11.6521C22.0214 11.8766 22.0214 12.1236 21.938 12.3481C21.1263 14.3163 19.7485 15.9991 17.9792 17.1832C16.21 18.3674 14.129 18.9995 12 18.9995C9.87106 18.9995 7.79004 18.3674 6.02079 17.1832C4.25153 15.9991 2.87372 14.3163 2.06202 12.3481Z" stroke="#0F172B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                              <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="#0F172B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          )}
                        </button>
                      </div>
                      <ErrorMessage
                        name="password"
                        component="p"
                        className="mt-2 text-sm text-red-500"
                      />
                    </div>

                    {/* Remember Me and Forgot Password */}
                    <div className="flex items-end justify-end">
                      <div className="text-sm">
                        <Link href="/reset-password" className="font-medium text-primary-600 hover:text-primary-500">
                          Quên mật khẩu
                        </Link>
                      </div>
                    </div>

                    {/* Login Button */}
                    <div>
                      <button
                        type="submit"
                        disabled={authActionState?.status === 'loading'}
                        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {authActionState?.status === 'loading' ? 'Đang đăng nhập...' : 'Đăng nhập'}
                      </button>
                    </div>
                  </Form>
                </>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
