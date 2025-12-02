const ActionMenu = ({ items, className = "" }) => {
  return (
    <div className={`flex flex-col gap-1 text-sm ${className}`}>
      {items.map((item) => (
        <button
          key={item.key}
          onClick={item.onClick}
          className={`
            flex items-center gap-2 w-full
            px-3 py-2
            bg-transparent
            rounded-lg
            transition
            ${
              item.danger
                ? "text-red-300 hover:bg-red-800/40"
                : "text-purple-100 hover:bg-purple-700/40"
            }
          `}
        >
          {item.icon}
          <span>{item.label}</span>
        </button>
      ))}
    </div>
  );
};

export default ActionMenu;
