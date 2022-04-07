const configs = {
  baseButton: {
    theme: {
      default: {
        main: "border duration-100 ease-in-out rounded-md text-md",
        variant: {
          primary:
            "bg-blue-primary border-blue-dark text-white hover:bg-blue-light hover:text-black-dark hover:border-1 hover:border-blue-darker",
          light:
            "bg-gray-light border-gray-dark text-black hover:bg-blue-primary hover:text-white hover:border-1 hover:border-blue-darker",
          gradient:
            "border-blue-primary bg-gradient-to-r from-[#16a1eb] to-[#0c57b4] text-white hover:border-1 hover:border-blue-darker",
        },
        size: {
          small: "px-2 py-1 text-xs",
          medium: "px-4 py-2 text-md",
          large: "px-6 py-3 text-lg",
        },
        types: {
          fab: "rounded-full !p-0",
        },
        fabSize: {
          small: "w-6 h-6 leading-6",
          medium: "w-10 h-10 leading-10",
          large: "w-14 h-14 leading-14",
        },
      },
      // light-mode:add a config below
    },
  },

  notificationToast: {
    container:
      "fixed top-0 right-0 bottom-0 left-0 overflow-hidden z-50 pointer-events-none flex flex-col",
    item: "self-end block w-64 border-1 border-blue-primary px-4 py-2 bg-blue-primary text-white",
  },
};

export default configs;
