"use client"
import FooterLink from '@/components/forms/FooterLink';
import InputField from '@/components/forms/InputField';
import { Button } from '@/components/ui/button';
import React from 'react'
import {useForm} from "react-hook-form"

const SignIn = () => {
    const {
        register,
        handleSubmit,
        control,
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
          console.log(data)
        } catch (error) {
          console.log(error)
        }
      }
  return (
    <>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 scrollbar-hide">
       <InputField name="email" label="Email" placeholder="Enter your email" register={register} error={errors.email} validation={{required:'Email is required', pattern: /^\w+@\w+\.\w+$/, message: 'Email address is required'}}/>
     
     <InputField name="password" label="Password" placeholder="Enter a password" type="password" register={register} error={errors.password} validation={{required:' Full name is required', minLength: 8}}/>
     <Button 
        type="submit" 
        disabled={isSubmitting} 
        className="green-btn w-full mt-5 flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
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
      <FooterLink text="Don't have an account?" linkText="Sign up" href="sign-up"/>
      </form>
   </>
  )


}

export default SignIn
