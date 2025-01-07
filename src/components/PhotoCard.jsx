"use client";
import { CiEdit } from "react-icons/ci";
import { MdOutlineDelete } from "react-icons/md";
export default function PhotoCard({ photo, onEdit, onDelete }) {
  return (
    <div className="photo-card">
      <img src={photo.url} alt={photo.title} />
      <h3>{photo.title}</h3>
      <p>ID: {photo.id}</p>
      <div className="butoon-conteiner">
        <button onClick={onEdit}>
          <CiEdit />
        </button>
        <button onClick={onDelete}>
          <MdOutlineDelete />
        </button>
      </div>
    </div>
  );
}
