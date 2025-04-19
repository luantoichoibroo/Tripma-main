import * as Yup from "yup";

export const travelerSchema = Yup.object().shape({
  travelers: Yup.array().of(
    Yup.object().shape({
      name: Yup.object({
        firstName: Yup.string().required("Bắt buộc"),
        lastName: Yup.string().required("Bắt buộc"),
      }),
      dateOfBirth: Yup.string().required("Bắt buộc"),
      gender: Yup.string().required("Bắt buộc"),
      contact: Yup.object({
        emailAddress: Yup.string().email().required(),
        phones: Yup.array().of(
          Yup.object({
            number: Yup.string().required(),
          })
        ),
      }),
      documents: Yup.array().of(
        Yup.object({
          issuanceDate: Yup.string().required(),
          expiryDate: Yup.string().required(),
          number: Yup.string().required(),
        })
      ),
    })
  ),
});
