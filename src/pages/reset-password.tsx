import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { 
  requestResetPasswordAsync, 
  verifyOTPAsync, 
  changePasswordAsync,
  clearError,
  selectIsLoading,
  selectError,
  selectResetPasswordStep,
  selectResetPasswordEmail,
  selectResetPasswordOTP,
  setResetPasswordEmail,
  setResetPasswordOTP,
  resetResetPassword
} from '@/slices/authSlice';

interface ResetPasswordProps { }

interface EmailFormValues {
  email: string;
}

interface OTPFormValues {
  otp: string[];
}

interface PasswordFormValues {
  password: string;
  confirmPassword: string;
}

const ResetPassword: React.FC<ResetPasswordProps> = ({ }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();
  const dispatch = useAppDispatch();
  
  // Redux state
  const isLoading = useAppSelector(selectIsLoading);
  const error = useAppSelector(selectError);
  const currentStep = useAppSelector(selectResetPasswordStep);
  const email = useAppSelector(selectResetPasswordEmail);
  const otp = useAppSelector(selectResetPasswordOTP);

  // Clear error when component mounts
  useEffect(() => {
    dispatch(clearError());
    dispatch(resetResetPassword());
  }, [dispatch]);

  // Step 1: Email validation
  const emailValidationSchema = Yup.object({
    email: Yup.string()
      .email('Email không hợp lệ, vui lòng nhập địa chỉ email chính xác.')
      .required('Email không được để trống'),
  });

  // Step 2: OTP validation
  const otpValidationSchema = Yup.object({
    otp: Yup.array().of(
      Yup.string()
    ).test('otp-complete', 'Vui lòng nhập đủ 6 ký tự OTP', function (value) {
      return value && value.length === 6 && value.every(digit => digit && digit.length > 0);
    }),
  });

  // Step 3: Password validation
  const passwordValidationSchema = Yup.object({
    password: Yup.string()
      .min(6, 'Mật khẩu phải có ít nhất 6 ký tự')
      .required('Mật khẩu không được để trống'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], 'Mật khẩu không khớp')
      .required('Vui lòng nhập lại mật khẩu'),
  });

  const handleEmailSubmit = async (values: EmailFormValues, { setSubmitting }: any) => {
    try {
      await dispatch(requestResetPasswordAsync({ email: values.email })).unwrap();
      dispatch(setResetPasswordEmail(values.email));
    } catch (error: any) {
      console.log('Request reset password failed:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleOTPSubmit = async (values: OTPFormValues, { setSubmitting, setFieldError }: any) => {
    try {
      const otpString = values.otp.join('');
      dispatch(setResetPasswordOTP(otpString));
      await dispatch(verifyOTPAsync({ 
        email: email, 
        otp: otpString 
      })).unwrap();
    } catch (error: any) {
      console.log('OTP verification failed:', error);
      setFieldError('otp', 'Mã OTP sai, vui lòng thử lại!');
    } finally {
      setSubmitting(false);
    }
  };

  const handlePasswordSubmit = async (values: PasswordFormValues, { setSubmitting }: any) => {
    try {
      await dispatch(changePasswordAsync({
        email: email,
        otp: otp,
        newPassword: values.password
      })).unwrap();
    } catch (error: any) {
      console.log('Change password failed:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleBackToLogin = () => {
    router.push('/login');
  };

  const renderStep1 = () => (
    <Formik
      initialValues={{ email: '' }}
      validationSchema={emailValidationSchema}
      onSubmit={handleEmailSubmit}
    >
      {({ errors, touched, isSubmitting }) => (
        <Form className="space-y-6">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              Đặt lại mật khẩu
            </h2>
            <p className="text-gray-600 text-sm">
              Vui lòng nhập địa chỉ email của bạn để đặt lại mật khẩu
            </p>
          </div>

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

          <button
            type="submit"
            disabled={isSubmitting}
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Đang xử lý...' : 'Tiếp theo'}
          </button>
        </Form>
      )}
    </Formik>
  );

  const renderStep2 = () => (
    <Formik
      initialValues={{ otp: ['', '', '', '', '', ''] }}
      validationSchema={otpValidationSchema}
      onSubmit={handleOTPSubmit}
    >
      {({ values, errors, touched, isSubmitting, setFieldValue }) => (
        <Form className="space-y-6">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              Đặt lại mật khẩu
            </h2>
            <p className="text-gray-600 text-sm">
              Vui lòng nhập mã xác minh mà chúng tôi vừa gửi đến {email}
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nhập OTP
            </label>
            <div className="flex justify-between">
              {values.otp.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => {
                    const newOtp = [...values.otp];
                    newOtp[index] = e.target.value;
                    setFieldValue('otp', newOtp);

                    // Auto focus next input
                    if (e.target.value && index < 5) {
                      setTimeout(() => {
                        const inputs = document.querySelectorAll('input[type="text"]');
                        if (inputs[index + 1]) {
                          (inputs[index + 1] as HTMLInputElement).focus();
                        }
                      }, 0);
                    }
                  }}
                  onKeyDown={(e) => {
                    // Handle backspace
                    if (e.key === 'Backspace' && !digit && index > 0) {
                      setTimeout(() => {
                        const inputs = document.querySelectorAll('input[type="text"]');
                        if (inputs[index - 1]) {
                          (inputs[index - 1] as HTMLInputElement).focus();
                        }
                      }, 0);
                    }
                  }}
                  onPaste={(e) => {
                    e.preventDefault();
                    const pastedData = e.clipboardData.getData('text');
                    const numbers = pastedData.replace(/\D/g, '').slice(0, 6);

                    if (numbers.length === 6) {
                      const newOtp = numbers.split('');
                      setFieldValue('otp', newOtp);
                      // Focus last input
                      const target = e.target as HTMLInputElement;
                      const lastInput = target.parentElement?.lastElementChild?.querySelector('input') as HTMLInputElement;
                      if (lastInput) lastInput.focus();
                    }
                  }}
                  className={`w-12 h-12 text-center text-lg font-semibold border rounded-md focus:outline-none focus:ring-2 focus:ring-white focus:border-primary-300 ${errors.otp && touched.otp ? 'border-red-500' : 'border-gray-300'
                    }`}
                />
              ))}
            </div>
            <ErrorMessage
              name="otp"
              component="p"
              className="mt-2 text-sm text-red-500"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Đang xác minh...' : 'Tiếp theo'}
          </button>
        </Form>
      )}
    </Formik>
  );

  const renderStep3 = () => (
    <Formik
      initialValues={{ password: '', confirmPassword: '' }}
      validationSchema={passwordValidationSchema}
      onSubmit={handlePasswordSubmit}
    >
      {({ errors, touched, isSubmitting }) => (
        <Form className="space-y-6">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              Đặt lại mật khẩu
            </h2>
            <p className="text-gray-600 text-sm">
              Nhập mật khẩu mới của bạn
            </p>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Mật khẩu
            </label>
            <div className="relative">
              <Field
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="new-password"
                className={`appearance-none relative block w-full px-3 py-2 pr-10 border rounded-md 
                  text-gray-900 focus:outline-none focus:ring-2 focus:ring-white focus:border-primary-300 sm:text-sm 
                  ${errors.password && touched.password ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="Nhập mật khẩu mới"
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

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
              Nhập lại mật khẩu
            </label>
            <div className="relative">
              <Field
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                autoComplete="new-password"
                className={`appearance-none relative block w-full px-3 py-2 pr-10 border rounded-md 
                  text-gray-900 focus:outline-none focus:ring-2 focus:ring-white focus:border-primary-300 sm:text-sm 
                  ${errors.confirmPassword && touched.confirmPassword ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="Nhập lại mật khẩu mới"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
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
              name="confirmPassword"
              component="p"
              className="mt-2 text-sm text-red-500"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Đang cập nhật...' : 'Cập nhật'}
          </button>
        </Form>
      )}
    </Formik>
  );

  const renderStep4 = () => (
    <div className="text-center space-y-6">
      <div className="flex justify-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
          <svg
            className="w-8 h-8 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">
          Mật khẩu đã được cập nhật
        </h2>
        <p className="text-gray-600 text-sm">
          Mật khẩu đã được cập nhật thành công. Bạn đã sẵn sàng để đăng nhập với mật khẩu mới.
        </p>
      </div>

      <button
        onClick={handleBackToLogin}
        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
      >
        Quay lại đăng nhập
      </button>
    </div>
  );

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="flex flex-row justify-center items-center">
        <div className="flex items-center h-16">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">OM</span>
            </div>
            <span className="text-xl font-bold">OrderManager</span>
          </div>
        </div>
      </div>

      {/* Reset Password Form */}
      <div className="flex items-center justify-center py-12 px-6">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-lg border border-gray-200 p-8">
            {currentStep === 1 && renderStep1()}
            {currentStep === 2 && renderStep2()}
            {currentStep === 3 && renderStep3()}
            {currentStep === 4 && renderStep4()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword; 