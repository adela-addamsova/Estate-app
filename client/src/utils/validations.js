/* Validations of form steps */
import { estateValidationSchema } from 'shared';

export function isStep1Filled(form) {
  return (
    form.estateType.trim() !== '' &&
    form.region.trim() !== '' &&
    form.district.trim() !== ''
  );
}

export function isStep2Filled(form) {
  return (
    form.fullName.trim() !== '' &&
    form.email.trim() !== '' &&
    form.phone.length === 9
  );
}

export function isStep2Valid(form) {
  const dataToValidate = estateValidationSchema.pick({
    fullName: true,
    email: true,
    phone: true,
  });

  const result = dataToValidate.safeParse(form);

  if (!result.success) {
    const formattedError = result.error.format();
    return {
      fullName: formattedError.fullName?._errors?.[0],
      email: formattedError.email?._errors?.[0],
      phone: formattedError.phone?._errors?.[0],
    };
  }

  return {};
}