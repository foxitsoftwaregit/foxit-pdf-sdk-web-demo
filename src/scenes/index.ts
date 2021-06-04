import {
  closeSidebar,
  markAndRedactAStringOfText,
  createCustomStamp,
  movePage,
  openSidebar,
  rotatePage,
  createCalloutAnnotation,
  createTextNoteAnnotation,
  openSignDialog,
} from "../snippets";

const hello = [
  {
    positionX: "75px",
    positionY: "75px",
    elementName: "change-color-dropdown",
    sideTriangle: "top",
    header: "Create & edit",
    description:
      "The toolbar has everything you need. Print, protect, edit, comment, and much more.",
    func: (ref: any) => closeSidebar(ref.current.contentWindow.pdfui),
  },
  {
    positionX: "250px",
    positionY: "120px",
    elementName: "sidebar-bookmark",
    sideTriangle: "left",
    header: "Navigate the PDF",
    description:
      "Use the sidebar to see pages, annotations, form information, and to search the PDF.",
    func: (ref: any) =>
      openSidebar(ref.current.contentWindow.pdfui, "sidebar-bookmark"),
  },
  {
    positionX: "125px",
    positionY: "75px",
    elementName: "open-file-button-list",
    sideTriangle: "top",
    header: "Test with your own PDF",
    description: "Upload a file and test our capabilities.",
    func: (ref: any) => closeSidebar(ref.current.contentWindow.pdfui),
  },
  {
    positionX: "125px",
    positionY: "75px",
    elementName:"print-button",
    sideTriangle: "top",
    header: "Print your PDF",
    description: "Easily export and print to your specification.",
    func: (ref: any) => closeSidebar(ref.current.contentWindow.pdfui),
  },
];

const editPdf = [
  {
    positionX: "75px",
    positionY: "75px",
    sideTriangle: "top-custom",
    elementName: "edit-all-objects",
    header: "Directly edit PDF content",
    description:
      "Select the Edit tool to move or modify text, images, and shapes within the PDF.",
    func: (ref: any) => closeSidebar(ref.current.contentWindow.pdfui),
  },
  {
    positionX: "250px",
    positionY: "280px",
    sideTriangle: "left",
    header: "Rotate pages",
    description: "Right-click the page thumbnail to fix the page.",
    func: (ref: any) =>
      openSidebar(
        ref.current.contentWindow.pdfui,
        "sidebar-thumbnail-panel"
      ).then(() => rotatePage(ref.current.contentWindow.pdfui)),
  },
  {
    positionX: "250px",
    positionY: "300px",
    sideTriangle: "left",
    header: "Reorder pages",
    description:
      "Click & drag pages to put pages in the right order in the Thumbnail sidebar.",
    func: (ref: any) => movePage(ref.current.contentWindow.pdfui, 1, 0),
  },
];

const annotation = [
  {
    positionX: "65px",
    positionY: "75px",
    elementName: "create-text",
    sideTriangle: "top",
    header: "Add a note",
    description:
      "The ‘Note’ tool adds a note annotation to the top-left of the PDF page. You can drag-and-drop it to your desired location.",
    func: () => {},
  },
  {
    positionX:'200px',
    positionY: "200px",
    sideTriangle: "left-fixed",
    header: "Leave your note",
    description: "Click directly in the PDF to leave a note in context.",
    func: (ref: any) => createTextNoteAnnotation(ref.current.contentWindow.pdfui, 500, 300),
  },
  {
    positionX: "436px",
    positionY: "75px",
    elementName: "freetext-callout",
    sideTriangle: "top",
    header: "Create a callout",
    description:
      "Add a callout annotation to the page to highlight a detail or part of the document. You can freely move, resize or add text to the annotation after that.",
    func: (ref: any) => {
      openSidebar(
        ref.current.contentWindow.pdfui,
        "comment-list-sidebar-panel"
      ).then(() => {
        createCalloutAnnotation(ref.current.contentWindow.pdfui);
      });
    },
  },
  {
    positionX: "747px",
    positionY: "75px",
    elementName: "stamp-drop-down-ui",
    sideTriangle: "top",
    header: "Stamp",
    description: "Let's create your own stamp to easily mark your pages.",
    func: () => {},
  },
  {
    positionX: "800px",
    positionY: "510px",
    elementName: "add-custom-stamp",
    sideTriangle: "right",
    header: "Create a stamp",
    description:
      "You can create your own custom stamps using the Custom Stamps option. Click on any of the stamps to add on the page",
    func: (ref: any) => {
      createCustomStamp(
        ref.current.contentWindow.pdfui,
        location.origin + "/assets/stamp.jpg"
      );
    },
  },
];

const redaction = [
  {
    positionX: "351px",
    positionY: "75px",
    elementName: "create-redaction-controllers",
    sideTriangle: "top-custom",
    header: "Select what to redact",
    description:
      "Select Mark for Redaction to begin selecting text, an area, or a whole page to redact.",
    func: () => {},
  },
  {
    positionX: "475px",
    positionY: "75px",
    elementName: "redaction-apply",
    sideTriangle: "top",
    header: "Apply the redaction",
    description: "Ready to redact what you selected? Click “Apply”.",
    func: (ref: any) => closeSidebar(ref.current.contentWindow.pdfui),
  },
  {
    positionX: "565px",
    positionY: "75px",
    elementName: "redaction-search",
    sideTriangle: "top",
    header: "Search & Redact",
    description:
      "Search for terms in the whole PDF, and choose which to redact.",
    func: (ref: any) => {
      markAndRedactAStringOfText(ref.current.contentWindow.pdfui);
    },
  },
  {
    positionX: "325px",
    positionY: "83px",
    elementName: "fv-search-sidebar-panel",
    sideTriangle: "left-custom",
    header: "Search for terms",
    description:
      "Additionally, you can search a word or phrase in the document and select which instances of it you want to redact.",
    func: (ref: any) => {
      openSidebar(ref.current.contentWindow.pdfui, "sidebar-search");
    },
  },
];

const form = [
  {
    positionX: "385px",
    positionY: "75px",
    elementName: "fv--form-designer-create-text-btn",
    sideTriangle: "top",
    header: "Form builder",
    description:
      "Let’s create this form! Select the Create Text Field tool and place one in the document.",
    func: (ref: any) => closeSidebar(ref.current.contentWindow.pdfui),
  },
  {
    positionX: "430px",
    positionY: "75px",
    elementName: "fv--form-designer-create-sign-btn",
    sideTriangle: "top",
    header: "Create a signature field",
    description:
      "Create a desginated space for a signature. Select the tool, then click & drag.",
    func: (ref: any) =>
      openSidebar(ref.current.contentWindow.pdfui, "sidebar-field"),
  },
  {
    positionX: "335px",
    positionY: "75px",
    sideTriangle: "top",
    elementName: "fv--form-designer-create-list-box-btn",
    header: "Add more form fields",
    description:
      "Test out more types of fields! Checkboxes, radio input, dropdowns, and more await you in the toolbar.",
    func: () => {},
  },
];

const digital_signature = [
  {
    positionX: "105px",
    positionY: "75px",
    elementName: "protect-tab-group-sign",
    sideTriangle: "top-custom",
    header: "Create a signature",
    description:
      "Select the PDF Sign tool to create your custom signature. Signatures can be saved for easy reuse from this menu.",
    func: (ref: any) => closeSidebar(ref.current.contentWindow.pdfui),
  },
  {
    positionX: "70%",
    positionY: "70%",
    sideTriangle: "left",
    header: "Insert your signature",
    description:
      "Place your signature in the field (or anywhere else in the PDF)!",
    func: (ref: any) =>
      openSidebar(ref.current.contentWindow.pdfui, "sidebar-field").then(() => openSignDialog(ref.current.contentWindow.pdfui)),
  },
  {
    positionX: "335px",
    positionY: "75px",
    sideTriangle: "top",
    elementName: "password-protect-btn",
    header: "Protect your PDF",
    description: "Set a password on your document",
    func: () => {},
  },
];

const search = [
  {
    positionX: "325px",
    positionY: "83px",
    elementName: "fv-search-sidebar-panel",
    sideTriangle: "left-custom",
    header: "Search PDF text",
    description: "Enter a word or phrase to find all instances within the PDF.",
    func: (ref: any) => {
      openSidebar(ref.current.contentWindow.pdfui, "sidebar-search");
    },
  },
];

export {
  hello,
  editPdf,
  redaction,
  form,
  annotation,
  digital_signature,
  search,
};
