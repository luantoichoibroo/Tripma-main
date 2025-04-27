import * as Yup from "yup";

export const travelerSchema = Yup.object().shape({
  travelers: Yup.array().of(
    Yup.object().shape({
      name: Yup.object({
        firstName: Yup.string()
          .required("Họ không được để trống")
          .matches(/^[A-Z\s]+$/i, "Họ chỉ được chứa ký tự chữ"),
        lastName: Yup.string()
          .required("Tên không được để trống")
          .matches(/^[A-Z\s]+$/i, "Tên chỉ được chứa ký tự chữ"),
      }),
      dateOfBirth: Yup.date()
        .required("Ngày sinh không được để trống")
        .max(new Date(), "Ngày sinh không được ở tương lai")
        .min(
          new Date(new Date().setFullYear(new Date().getFullYear() - 120)),
          "Ngày sinh không hợp lệ"
        ),
      gender: Yup.string().required("Giới tính không được để trống"),
      contact: Yup.object({
        emailAddress: Yup.string()
          .email("Email không hợp lệ")
          .required("Email không được để trống"),
        phones: Yup.array().of(
          Yup.object({
            number: Yup.string()
              .required("Số điện thoại không được để trống")
              .matches(/^\d+$/, "Số điện thoại chỉ được chứa số")
              .min(9, "Số điện thoại phải có ít nhất 9 số")
              .max(15, "Số điện thoại không được vượt quá 15 số"),
          })
        ),
      }),
      documents: Yup.array().of(
        Yup.object({
          issuanceDate: Yup.date()
            .required("Ngày cấp không được để trống")
            .max(new Date(), "Ngày cấp không được sau ngày hiện tại"),
          expiryDate: Yup.date()
            .required("Ngày hết hạn không được để trống")
            .min(Yup.ref("issuanceDate"), "Ngày hết hạn phải sau ngày cấp"),
          number: Yup.string()
            .required("Số hộ chiếu không được để trống")
            .matches(/^[A-Z0-9]+$/, "Số hộ chiếu chỉ được chứa chữ và số"),
        })
      ),
    })
  ),
});
