"use client"
import FooterLink from '@/components/forms/FooterLink';
import InputField from '@/components/forms/InputField';
import { Button } from '@/components/ui/button';
import { signInWithEmail } from '@/lib/actions/auth.actions';
import { signInEmail } from 'better-auth/api';
import { useRouter } from 'next/navigation';
import React from 'react'
import {useForm} from "react-hook-form"
import { toast } from 'sonner';

const SignIn = () => {
  const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting},
      } = useForm<SignInFormData>({
        defaultValues:{
          email: '',
          password:'',
        },
        mode:'onBlur'
      });

      const onSubmit = async (data : SignInFormData) => {
        try {
          const result = await signInWithEmail(data);
          if (result.success) router.push("/")
        } catch (error) {
          toast.error('Sign in failed', {
            description: error instanceof Error ? error.message : 'Failed to Sign in'
          })
        }
      }
    

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Header section to match SignUp style */}
      <div className="mb-8 text-center lg:text-left">
        <h1 className='text-3xl font-bold text-white'>
          Welcome Back
        </h1>
        <p className="text-gray-400 mt-2">Enter your details to access your cosmic dashboard</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <InputField 
          name="email" 
          label="Email" 
          placeholder="Enter your email" 
          register={register} 
          error={errors.email} 
          validation={{ required:'Email is required', pattern: {  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, message: "Invalid email" } }}
        />
     
        <InputField 
          name="password" 
          label="Password" 
          placeholder="Enter your password" 
          type="password" 
          register={register} 
          error={errors.password} 
          validation={{required:'Password is required', minLength: 8}}
        />

        <div className="pt-2">
          <Button 
            type="submit" 
            disabled={isSubmitting} 
            className="green-btn w-full flex items-center justify-center gap-2 transition-all active:scale-[0.98] py-6"
          >
            {isSubmitting ? (
              <>
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-gray-950/30 border-t-gray-950" />
                Verifying...
              </>
            ) : (
              "Sign in"
            )}
          </Button>

          <div className="mt-6">
            <FooterLink text="Don't have an account?" linkText="Sign up" href="sign-up"/>
          </div>
        </div>
      </form>
    </div>
  )
}

export default SignIn