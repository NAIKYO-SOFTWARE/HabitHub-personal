import { useRef, useState } from "react";
import {
  BaseFormInputs,
  FormProvider,
  UseFormProvider,
} from "../../components/Form";
import { FormInputEnum } from "../../constants/form";
import { ButtonLoad } from "../../components/Button/ButtonLoad";
import { useAppStore } from "../../store/app-store";

const inputs = [
  {
    name: "email",
    type: FormInputEnum.INPUT,
    label: "Email",
    required: { value: true, message: "Email is required" },
    parent: {
      value: /\S+@\S+\.\S+/,
      message: "Entered value does not match email format",
    },
    placeholder: "Enter your email",
    className:
      "relative justify-center text-xl items-start self-stretch w-full px-5 py-6  whitespace-nowrap bg-white rounded-xl text-stone-900 text-opacity-80",
  },
  {
    name: "password",
    type: FormInputEnum.PASSWORD,
    label: "password",
    required: { value: true, message: "Password is required" },
    placeholder: "Enter your password",
    className:
      "relative justify-center text-xl items-start self-stretch w-full mt-2 px-5 py-6 whitespace-nowrap bg-white rounded-xl text-stone-900 text-opacity-80",
  },
];

interface LoginInputs extends BaseFormInputs {
  email: string;
  password: string;
}

function Login() {
  const [isError, setError] = useState(false);
  const formRef = useRef<UseFormProvider>(null);
  const login = useAppStore((s) => s.login);
  const loading = useAppStore((s) => s.loading);

  const onSubmit = (data: LoginInputs) => {
    data && login(data);
  };

  const onHandleSubmit = () => {
    !isError && formRef.current?.handleSubmit(onSubmit)();
  };

  return (
    <div className="flex h-full flex-col justify-center mx-auto text-sm bg-neutral-100 w-full ">
      <div className="flex overflow-hidden relative flex-col items-center px-5 pt-0.5 pb-6 w-full">
        <div className="relative mt-20 text-lg font-bold leading-5 text-purple-400">
          Log in to HabitHUB
        </div>
        <div className="relative mt-5 font-light tracking-normal leading-5 text-center text-neutral-800 w-[293px]">
          Welcome back! Sign in using your social account or email to continue
          us
        </div>
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/7b8ccf355c01d625c5e63f0b532f782d0b762c45367446feac9c0d38f7d2f581?apiKey=a2cc08c2158b472ea9e74eac6e01b6cc&"
          className="mt-9 max-w-full aspect-[3.85] w-[184px]"
        />
        <div className="flex relative gap-4 items-center mt-8 font-black tracking-normal text-center whitespace-nowrap leading-[100%] text-neutral-500">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/d80b30a1555b7d649ea547a03fe59864ddd15b5801fd181515e2d82ac8523bf7?apiKey=a2cc08c2158b472ea9e74eac6e01b6cc&"
            className="shrink-0 self-stretch my-auto max-w-full border border-solid aspect-[100] border-neutral-300 stroke-[1px] stroke-neutral-300 w-[132px]"
          />
          <div className="self-stretch">OR</div>
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/d80b30a1555b7d649ea547a03fe59864ddd15b5801fd181515e2d82ac8523bf7?apiKey=a2cc08c2158b472ea9e74eac6e01b6cc&"
            className="shrink-0 self-stretch my-auto max-w-full border border-solid aspect-[100] border-neutral-300 stroke-[1px] stroke-neutral-300 w-[132px]"
          />
        </div>

        <FormProvider
          handleErrors={(error) => setError(!!error)}
          ref={formRef}
          inputs={inputs}
          mode="onBlur"
          className="w-full my-10"
        />
        <ButtonLoad
          onClick={onHandleSubmit}
          label="Login"
          isDisable={loading}
          loading={loading}
          className=" bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 font-medium rounded-lg text-2xl px-16 py-2.5 text-center text-white me-2 mb-2"
        />
      </div>
    </div>
  );
}

Login.propTypes = {};

export default Login;
