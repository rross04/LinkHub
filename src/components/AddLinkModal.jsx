import { useState, useEffect } from 'react';

export default function AddLinkModal({ onClose, onAdd, categories }) {
  const [form, setForm] = useState({
    title: '',
    url: '',
    description: '',
    category: categories[0],
    icon: '🔗',
  });

  const EMOJIS = [
  '😀','😂','😍','🤔','😎','🥳','😴','🤯','🥰','😅','😊','🤩','😏','😒','😭','😤','🤗','😬','🙄','😇',
  '👍','👎','👏','🙌','🤝','✌️','🤞','👌','🤙','💪','🖐️','👋','🤜','🤛','👊','✊','🤲','🙏',
  '💻','🖥️','📱','⌨️','🖱️','🖨️','📷','📸','📹','🎥','📡','🔋','💾','💿','📀','🖲️','📲',
  '🔧','🔨','⚙️','🛠️','🔩','🪛','🔑','🗝️','🔐','🔒','🔓','🪤','🧰','🪝',
  '📄','📃','📑','📊','📈','📉','📋','📌','📍','📎','🖇️','✂️','🗂️','🗃️','🗄️','📁','📂','🗑️','✏️','🖊️','🖋️','📝','📏','📐',
  '📧','📨','📩','📤','📥','📦','📫','📪','📬','📭','📮','📯','📢','📣','🔔','🔕','💬','💭','🗨️','📞','☎️','📟','📠',
  '💰','💵','💴','💶','💷','💸','💳','🏦','💹','📊','🤑','💱',
  '🚗','🚕','🚙','🚌','🚎','🏎️','🚓','🚑','🚒','🚐','🛻','🚚','🚛','🚜','🏍️','🛵','🚲','🛴','🛺','🚁','✈️','🚀','🛸','⛵','🚢',
  '🌱','🌿','🍃','🌲','🌳','🌴','🌵','🌾','🍀','🌺','🌸','🌼','🌻','🌹','🍁','🍂','🍄','🌊','🔥','⭐','🌙','☀️','🌈','❄️','⚡','🌍',
  '🍎','🍊','🍋','🍇','🍓','🍒','🍑','🥭','🍍','🥥','🥝','🍅','🥑','🍆','🥦','🌽','🥕','🧄','🧅','🥔','🍕','🍔','🌮','🌯','🍜','🍣','🍩','🎂','☕','🧋',
  '⚽','🏀','🏈','⚾','🎾','🏐','🎱','🏓','🎮','🕹️','🎯','🎲','🧩','🎭','🎨','🎬','🎤','🎧','🎸','🎹','🎺','🎻','🥁',
  '❤️','🧡','💛','💚','💙','💜','🖤','🤍','🤎','💔','❗','❓','⚠️','✅','❌','🔴','🟠','🟡','🟢','🔵','🟣','⚫','⚪','🔺','🔻','🔷','🔶','🔹','🔸',
  '🏠','🏢','🏥','🏦','🏨','🏪','🏫','🏭','🗼','🗽','🏰','🏯','⛩️','🕌','🕍','⛪','🌐','🗺️','🧭','🏔️','🌋',
];

    const [emojiSearch, setEmojiSearch] = useState('');
    const [showPicker, setShowPicker] = useState(false);

    const filteredEmojis = EMOJIS.filter(e =>
          e.includes(emojiSearch)
    );

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = () => {
        if (!form.title.trim() || !form.url.trim()) return;
        onAdd(form);
    };


  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2 className="modal__title">Agregar link</h2>

        <div className="modal__field">
          <label>Ícono</label>
          <div className="emoji-selected" onClick={() => setShowPicker(!showPicker)}>
            <span className="emoji-preview">{form.icon}</span>
            <span className="emoji-hint">   Cambiar Emoji</span>
          </div>

          {showPicker && (
            <div className="emoji-picker">
              <input
                className="emoji-picker__search"
                placeholder="Buscar emoji..."
                value={emojiSearch}
                onChange={e => setEmojiSearch(e.target.value)}
              />
              <div className="emoji-picker__grid">
                {filteredEmojis.map((e, i) => (
                  <button
                    key={i}
                    className="emoji-picker__item"
                    onClick={() => {
                      setForm({ ...form, icon: e });
                      setShowPicker(false);
                    }}
                  >
                    {e}
                  </button>
                ))}
              </div>
            </div>
          )}

        </div>
        <div className="modal__field">
          <label>Nombre *</label>
          <input name="title" value={form.title} onChange={handleChange} placeholder="Ej: Gmail" />
        </div>
        <div className="modal__field">
          <label>URL *</label>
          <input name="url" value={form.url} onChange={handleChange} placeholder="https://..." />
        </div>
        <div className="modal__field">
          <label>Descripción</label>
          <input name="description" value={form.description} onChange={handleChange} placeholder="Opcional" />
        </div>
        <div className="modal__field">
          <label>Categoría</label>
          <select name="category" value={form.category} onChange={handleChange}>
            {categories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        <div className="modal__actions">
          <button className="modal__cancel" onClick={onClose}>Cancelar</button>
          <button className="modal__submit" onClick={handleSubmit}>Agregar</button>
        </div>
      </div>
    </div>
  );
}