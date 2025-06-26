import { z } from 'zod';

export const estateSchema = z.object({
    estateType: z.string().min(1, 'Typ nemovitosti je povinný.'),
    region: z.string().min(1, 'Kraj je povinný.'),
    district: z.string().min(1, 'Okres je povinný.'),
    fullName: z
        .string().max(100).min(1)
        .regex(/\b\w+\b\s+\b\w+\b/, 'Zadejte prosím celé jméno.'),
    phone: z
        .string()
        .regex(
            /^(601|602|603|604|605|606|607|608|609|702|72[0-9]|73[0-9]|77[0-9]|79[0-9])\d{6}$/,
            'Zadejte prosím platné české telefonní číslo.'
        ),
    email: z.string().max(100).min(1).email('Zadejte prosím platnou emailovou adresu.'),
}).strip();
