import { useEffect, useState } from "react";

export default function Journal() {

  const [title, setTitle] =
    useState("");

  const [note, setNote] =
    useState("");

  const [savedNotes, setSavedNotes] =
    useState([]);

  const [editingId, setEditingId] =
    useState(null);

  // =========================
  // USER IDENTIFICATION
  // =========================

  const userKey =
    localStorage.getItem(
      "currentUser"
    ) || "guest";

  const notesKey =
    `tradingJournalNotes_${userKey}`;

  // =========================
  // LOAD NOTES
  // =========================

  useEffect(() => {

    const storedNotes =
      localStorage.getItem(
        notesKey
      );

    if (storedNotes) {

      try {

        setSavedNotes(
          JSON.parse(
            storedNotes
          )
        );

      } catch {

        setSavedNotes([]);
      }

    } else {

      setSavedNotes([]);
    }

  }, [notesKey]);

  // =========================
  // SAVE TO STORAGE
  // =========================

  const saveToStorage = (
    notes
  ) => {

    localStorage.setItem(
      notesKey,
      JSON.stringify(notes)
    );
  };

  // =========================
  // SAVE / UPDATE NOTE
  // =========================

  const handleSave = () => {

    if (
      !title.trim() ||
      !note.trim()
    )
      return;

    if (editingId) {

      const updatedNotes =
        savedNotes.map((item) =>

          item.id === editingId

            ? {
                ...item,
                title,
                note,
              }

            : item
        );

      setSavedNotes(
        updatedNotes
      );

      saveToStorage(
        updatedNotes
      );

      setEditingId(null);

    } else {

      const newNote = {

        id: Date.now(),

        title,

        note,

        createdAt:
          new Date().toLocaleString(),
      };

      const updatedNotes = [
        newNote,
        ...savedNotes,
      ];

      setSavedNotes(
        updatedNotes
      );

      saveToStorage(
        updatedNotes
      );
    }

    setTitle("");
    setNote("");
  };

  // =========================
  // DELETE NOTE
  // =========================

  const handleDelete = (
    id
  ) => {

    const filtered =
      savedNotes.filter(
        (item) =>
          item.id !== id
      );

    setSavedNotes(filtered);

    saveToStorage(filtered);

    if (editingId === id) {

      setEditingId(null);

      setTitle("");
      setNote("");
    }
  };

  // =========================
  // EDIT NOTE
  // =========================

  const handleEdit = (
    item
  ) => {

    setEditingId(item.id);

    setTitle(item.title);

    setNote(item.note);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div>

      <h1 className="dash-title">
        Trading Journal
      </h1>

      <div className="journal-wrapper">

        <div className="mini-note-box glass">

          <input
            type="text"
            className="mini-note-title"
            placeholder="Heading"
            value={title}
            onChange={(e) =>
              setTitle(
                e.target.value
              )
            }
          />

          <textarea
            className="mini-note-text"
            placeholder="Write note..."
            value={note}
            onChange={(e) =>
              setNote(
                e.target.value
              )
            }
          />

          <button
            className="mini-save-btn"
            onClick={handleSave}
          >
            {editingId
              ? "Update"
              : "Save"}
          </button>

        </div>

        {savedNotes.length > 0 && (

          <div className="journal-notes-grid">

            {savedNotes.map(
              (item) => (

                <div
                  key={item.id}
                  className="journal-note-card glass"
                >

                  <div className="journal-note-top">

                    <div>

                      <h3>
                        {item.title}
                      </h3>

                      <span>
                        {
                          item.createdAt
                        }
                      </span>

                    </div>

                  </div>

                  <p>
                    {item.note}
                  </p>

                  <div className="journal-note-actions">

                    <button
                      className="edit-note-btn"
                      onClick={() =>
                        handleEdit(
                          item
                        )
                      }
                    >
                      Edit
                    </button>

                    <button
                      className="delete-note-btn"
                      onClick={() =>
                        handleDelete(
                          item.id
                        )
                      }
                    >
                      Delete
                    </button>

                  </div>

                </div>
              )
            )}

          </div>
        )}

      </div>

    </div>
  );
}