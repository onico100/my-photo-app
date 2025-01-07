"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import PhotoCard from "../components/PhotoCard";
import PhotoModal from "../components/PhotoModal";

export default function Home() {
  const [photos, setPhotos] = useState([]);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Load photos from localStorage or fetch from API
  useEffect(() => {
    const storedPhotos = JSON.parse(localStorage.getItem("photos"));
    if (storedPhotos) {
      setPhotos(storedPhotos);
    } else {
      // Fetch from API only if localStorage is empty
      axios
        .get("https://jsonplaceholder.typicode.com/photos?_limit=10")
        .then((response) => {
          setPhotos(response.data);
          localStorage.setItem("photos", JSON.stringify(response.data)); // Save to localStorage
        })
        .catch((error) => console.error("Error fetching photos:", error));
    }
  }, []);

  // Save photos to localStorage whenever they are updated
  useEffect(() => {
    localStorage.setItem("photos", JSON.stringify(photos));
  }, [photos]);

  const openModal = (photo) => {
    setSelectedPhoto(photo);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedPhoto(null);
    setIsModalOpen(false);
  };

  const handleSave = (updatedPhoto) => {
    setPhotos((prev) =>
      prev.map((photo) => (photo.id === updatedPhoto.id ? updatedPhoto : photo))
    );
    closeModal();
  };

  const handleDelete = (id) => {
    setPhotos((prev) => prev.filter((photo) => photo.id !== id));
  };

  const handleAddPhoto = (newPhoto) => {
    setPhotos((prev) => [...prev, newPhoto]);
  };

  return (
    <div>
      <h1>Photo List</h1>
      <button onClick={() => openModal({ id: "", title: "", url: "" })}>
        Add New Photo
      </button>
      <div className="photo-list">
        {photos.map((photo) => (
          <PhotoCard
            key={photo.id}
            photo={photo}
            onEdit={() => openModal(photo)}
            onDelete={() => handleDelete(photo.id)}
          />
        ))}
      </div>
      {isModalOpen && (
        <PhotoModal
          photo={selectedPhoto}
          onSave={handleSave}
          onClose={closeModal}
          onAdd={handleAddPhoto}
          photos={photos}
        />
      )}
    </div>
  );
}
