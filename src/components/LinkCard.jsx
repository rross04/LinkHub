export default function LinkCard({ id, title, description, url, category, icon, onDelete }) {
  return (
    <a className="link-card" href={url} target="_blank" rel="noreferrer">
      <div className="link-card__icon" aria-hidden="true">{icon}</div>
      <div className="link-card__content">
        <span className="link-card__category">{category}</span>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
      <div className="link-card__right">
        {onDelete && (
          <button
            className="link-card__delete"
            onClick={(e) => {
              e.preventDefault(); // evitar que abra el link
              onDelete(id);
            }}
            aria-label="Eliminar"
          >
            ✕
          </button>
        )}
      </div>
    </a>
  );
}