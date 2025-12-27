"use client"

import { CountrySelectField } from "@/components/forms/CountrySelectField";
import FooterLink from "@/components/forms/FooterLink";
import InputField from "@/components/forms/InputField";
import SelectField from "@/components/forms/SelectField";
import { Button } from "@/components/ui/button";
import { INVESTMENT_GOALS, PREFERRED_INDUSTRIES, RISK_TOLERANCE_OPTIONS } from "@/lib/constants";
import {useForm} from "react-hook-form"
import { signUpWithEmail } from "@/lib/actions/auth.actions";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const SignUp = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting},
  } = useForm<SignUpFormData>({
    defaultValues:{
      fullName: '',
      email: '',
      password:'',
      country:'CA',
      investmentGoals:'Growth',
      riskTolerance:'Medium',
      preferredIndustry:'Technology'
    },
    mode:'onBlur'
  });

  const onSubmit = async (data : SignUpFormData) => {
    try {
      const result = await signUpWithEmail(data);
      if (result.success) router.push("/")
    } catch (error) {
      toast.error('Sign up failed', {
        description: error instanceof Error ? error.message : 'Failed to create an account'
      })
    }
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="mb-6 text-center lg:text-left">
        <h1 className='text-2xl font-bold text-white lg:text-3xl'>
          Sign Up & Personalize
        </h1>
        <p className="text-gray-400 text-sm mt-1">Begin your cosmic financial journey</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Grid Layout: 2 columns on larger screens to save vertical space */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-3">
          
          <div className="md:col-span-2">
            <InputField name="fullName" label="Full Name" placeholder="Enter your full name"
              register={register} error={errors.fullName}
              validation={{ required:'Full name is required', minLength: { value: 2, message: "Too short" } }}
            />
          </div>

          <InputField name="email" label="Email" placeholder="Enter your email"
            register={register} error={errors.email}
            validation={{ required:'Email is required', pattern: {  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, message: "Invalid email" } }}
          />

          <InputField name="password" label="Password" placeholder="Enter a password" type="password"
            register={register} error={errors.password}
            validation={{ required:'Password is required', minLength: { value: 8, message: "Min 8 characters" } }}
          />

          <CountrySelectField name="country" label="Country" control={control} error={errors.country} required/>
          
          <SelectField name="investmentGoals" label="Investment Goals" placeholder="Select goal" options={INVESTMENT_GOALS} control={control} error={errors.investmentGoals} required/>
          
          <SelectField name="riskTolerance" label="Risk Tolerance" placeholder="Select tolerance" options={RISK_TOLERANCE_OPTIONS} control={control} error={errors.riskTolerance} required/>
          
          <SelectField name="preferredIndustry" label="Preferred Industry" placeholder="Select industry" options={PREFERRED_INDUSTRIES} control={control} error={errors.preferredIndustry} required/>
        </div>

        <div className="pt-2">
          <Button 
            type="submit" 
            disabled={isSubmitting} 
            className="green-btn w-full flex items-center justify-center gap-2 transition-all active:scale-[0.98] py-6"
          >
            {isSubmitting ? "Verifying..." : "Start Your Investing Journey"}
          </Button>
          
          <div className="mt-4">
            <FooterLink text="Already have an account?" linkText="Sign in" href="sign-in"/>
          </div>
        </div>
      </form>
    </div>
  )
}

export default SignUp