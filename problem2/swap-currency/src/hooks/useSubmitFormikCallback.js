import { useCallback } from "react";
import { parseErrorResponse } from "../untils/helpers";

const useSubmitFormikCallback = ({ onSubmit, onError, onSuccess }, deps) =>
  useCallback(
    async (values, formikBag) => {
      const response = await onSubmit(values, formikBag);
      formikBag.setSubmitting(false);

      if (response) {
        try {
          const errors = parseErrorResponse(response);
          formikBag.setErrors(errors);
        } catch (e) {
          console.error(e);
        } finally {
          onError && onError(response);
        }
        return;
      }

      onSuccess && onSuccess(values, formikBag);
    },
    deps
  );

export default useSubmitFormikCallback;
