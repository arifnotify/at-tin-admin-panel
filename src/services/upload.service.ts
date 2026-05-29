import api from "./api";

export const uploadImages = async (
  files: FileList,
) => {
  const formData =
    new FormData();

  // MULTIPLE FILES
  for (
    let i = 0;
    i < files.length;
    i++
  ) {
    formData.append(
      "files",
      files[i],
    );
  }

  const response =
    await api.post(
      "/upload/multiple",
      formData,
      {
        headers: {
          "Content-Type":
            "multipart/form-data",
        },
      },
    );

  return response.data;
};