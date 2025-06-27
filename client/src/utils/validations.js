/* Validations of form steps */
import { estateSchema } from '../../../shared/estateSchema';

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

export function validateStep2(form) {
  const partialSchema = estateSchema.pick({
    fullName: true,
    email: true,
    phone: true,
  });

  const result = partialSchema.safeParse(form);

  if (!result.success) {
    const formatted = result.error.format();
    return {
      fullName: formatted.fullName?._errors?.[0],
      email: formatted.email?._errors?.[0],
      phone: formatted.phone?._errors?.[0],
    };
  }

  return {};
}