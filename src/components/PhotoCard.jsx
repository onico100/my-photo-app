"use client";
export default function PhotoCard({ photo, onEdit, onDelete }) {
  return (
    <div className="photo-card">
      <img src={photo.url} alt={photo.title} />
      <h3>{photo.title}</h3>
      <p>ID: {photo.id}</p>
      <div className="butoon-conteiner">
        <button onClick={onEdit}>Edit</button>
        <button onClick={onDelete}>Delete</button>
      </div>
    </div>
  );
}
