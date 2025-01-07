"use client";
import Modal from "react-modal";
import { useForm } from "react-hook-form";

export default function PhotoModal({ photo, onSave, onClose, onAdd, photos }) {
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm({
    defaultValues: photo,
  });

  const onSubmit = (data) => {
    const isDuplicate = photos.some(
      (p) => (p.title === data.title || p.url === data.url) && p.id !== data.id
    );

    if (isDuplicate) {
      setError("duplicate", { message: "Title or URL already exists." });
      return;
    }

    clearErrors("duplicate");

    if (photo.id) {
      onSave(data);
    } else {
      onAdd({ ...data, id: Date.now() });
    }
  };

  return (
    <Modal isOpen onRequestClose={onClose} contentLabel="Photo Modal">
      <h2>{photo.id ? "Edit Photo" : "Add New Photo"}</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>ID</label>
          <input {...register("id")} disabled />
        </div>
        <div>
          <label>Title</label>
          <input {...register("title", { required: "Title is required" })} />
          {errors.title && <p>{errors.title.message}</p>}
        </div>
        <div>
          <label>URL</label>
          <input
            {...register("url", {
              required: "URL is required",
              pattern: {
                value: /^https?:\/\/.+\.(jpg|jpeg|png|gif)$/,
                message: "Enter a valid URL",
              },
            })}
          />
          {errors.url && <p>{errors.url.message}</p>}
        </div>
        {errors.duplicate && <p>{errors.duplicate.message}</p>}
        <div className="butoon-conteiner">
          <button type="submit">Save</button>
          <button type="button" onClick={onClose}>
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  );
}
