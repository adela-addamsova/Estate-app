/* Validations of forms 2nd step */
import { estateSchema } from '../../../shared/estateSchema';

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
