import * as UIExtension from "UIExtension";
import "@foxitsoftware/foxit-pdf-sdk-for-web-library/lib/UIExtension.vw.css";
import "./index.css";

const { PDFUI, PDFViewCtrl } = UIExtension;
const { DeviceInfo, Events } = PDFViewCtrl;
const File_Type = PDFViewCtrl.PDF.constant.File_Type;
const Annot_Flags = PDFViewCtrl.PDF.annots.constant.Annot_Flags;

const libPath = "/lib/";

const pdfui = new PDFUI({
  viewerOptions: {
    libPath: libPath,
    jr: {
      workerPath: libPath,
      enginePath: libPath + "jr-engine/gsdk/",
      fontPath: "https://webpdf.foxitsoftware.com/webfonts/",
      brotli: {
        core: false,
      },
      licenseSN: licenseSN,
      licenseKey: licenseKey,
    },
  },
  renderTo: "#pdf-ui",
  appearance: UIExtension.appearances.adaptive,
  addons: DeviceInfo.isMobile
    ? "/lib/uix-addons/allInOne.mobile.js"
    : "/lib/uix-addons/allInOne.js",
});

window.pdfui = pdfui;

pdfui.addViewerEventListener(PDFViewCtrl.ViewerEvents.openFileSuccess, () => {
  window.pdfui = pdfui;
});

window.isDesktopDevise = DeviceInfo.isDesktop;

window.addEventListener(
  DeviceInfo.isDesktop ? "resize" : "orientationchange",
  () => {
    pdfui.redraw();
  }
);

pdfui.addViewerEventListener(Events.openFileSuccess, () => {
  console.info("open file success");
  pdfui.getRootComponent().then((root) => {
    const commentTab = root.getComponentByName("comment-tab");
    commentTab.active();
  });
});

pdfui.addViewerEventListener(Events.annotationUpdated, (annots, page, type) => {
  console.log("annotations updated", annots, page, type);
});
pdfui.addViewerEventListener(Events.annotationAdded, (annots) => {
  pdfui
    .getCurrentPDFDoc()
    .then((doc) => {
      return doc.exportAnnotsToFDF(File_Type.fdf, annots.slice(0, 1));
    })
    .then((fdf) => {
      console.log("annotations added", annots, fdf);
    });
});
pdfui.addViewerEventListener(Events.annotationRemoved, (removedAnnots) => {
  console.log("annotations removed", removedAnnots);
});
pdfui.addViewerEventListener(PDFViewCtrl.ViewerEvents.openFileSuccess, () => {
  window.pdfui = pdfui;
});

const AnnotType = PDFViewCtrl.PDF.annots.constant.Annot_Type;

pdfui.setDefaultAnnotConfig((type, intent) => {
  switch (type) {
    case AnnotType.highlight:
      return {
        borderInfo: {
          width: 5,
        },
        color: 0x00ff00,
      };
    case AnnotType.ink:
      return {
        color: 0x0000ff,
        borderInfo: {
          width: 5,
        },
      };
  }
});

pdfui
  .openPDFByHttpRangeRequest(
    {
      range: {
        //Default PDF file path
        url: "/assets/Feature-example_annotations.pdf",
      },
    },
    { fileName: "Feature-example_annotations.pdf" }
  )
  .then((doc) => {
    Promise.all([
      createTextNote(doc, 1), // 2nd page
      createTypeWriter(doc, 2), // 3rd page
      createAreaHighlight(doc, 3), // 4th page
      createSquare(doc, 0), // 1st page
      createPencil(doc, 4), // 5th page
    ]);
  });
function createPencil(pdfDoc, pageIndex) {
  const points = [
    { x: 357, y: 531, type: 1 },
    { x: 528, y: 531, type: 2 },
    { x: 338, y: 492, type: 1 },
    { x: 567, y: 492, type: 2 },
  ];
  const rect = {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  };
  points.forEach((it) => {
    rect.left = Math.min(it.x, rect.left);
    rect.right = Math.max(it.x, rect.left);
    rect.top = Math.min(it.y, rect.top);
    rect.bottom = Math.max(it.y, rect.top);
  });
  return createAnnotation(
    pdfDoc,
    {
      type: "ink",
      flags: Annot_Flags.print,
      rect: rect,
      inkList: points,
    },
    pageIndex
  );
}

function createSquare(pdfDoc, pageIndex) {
  return pdfDoc.getPageByIndex(pageIndex).then((page) => {
    const [left, top] = page.reverseDevicePoint([0, 0], 1, 0);
    return page.addAnnot({
      type: "square",
      opacity: 1,
      flags: Annot_Flags.print,
      date: new Date(),
      rect: {
        left,
        top,
        right: left + 100,
        bottom: top - 100,
      },
    });
  });
}
function createAreaHighlight(pdfDoc, pageIndex) {
  const rect = {
    top: 67.17839813232422,
    right: 765.9221801757812,
    bottom: 51.63336181640625,
    left: 497.05999755859375,
  };
  return createAnnotation(
    pdfDoc,
    {
      flags: Annot_Flags.print,
      type: "highlight",
      rect,
      quadPoints: [
        [
          { x: rect.left, y: rect.left },
          { x: rect.right, y: rect.left },
          { x: rect.left, y: rect.bottom },
          { x: rect.right, y: rect.bottom },
        ],
      ],
      opacity: 1,
      date: new Date(),
    },
    pageIndex
  );
}
function createTypeWriter(pdfDoc, pageIndex) {
  return createAnnotation(
    pdfDoc,
    {
      flags: Annot_Flags.print,
      type: "freetext",
      intent: "FreeTextTypewriter",
      subject: "FreeTextTypewriter",
      contents: "This is an example of creating Typerwriter",
      rect: {
        left: 120,
        right: 231,
        top: 500,
        bottom: 488,
      },
      date: new Date(),
    },
    pageIndex
  );
}
pdfui.getRootComponent().then((root) => {
  const commentTab = root.getComponentByName("comment-tab");
  commentTab.active();
  const commentTabGroup = root.getComponentByName("comment-tab-group-text");
  commentTabGroup.setRetainCount(4);
});
function createTextNote(pdfDoc, pageIndex) {
  const left = 500;
  const top = 500;
  return createAnnotation(
    pdfDoc,
    {
      flags: Annot_Flags.noZoom | Annot_Flags.readOnly,
      type: "text",
      contents: "Welocome to FoxitPDFSDK for Web",
      rect: {
        left,
        right: left + 40,
        top,
        bottom: top - 40,
      },
      date: new Date(),
    },
    pageIndex
  );
}

function createAnnotation(pdfDoc, annotJson, pageIndex) {
  return pdfDoc.getPageByIndex(pageIndex).then((pdfPage) => {
    return pdfPage.addAnnot(annotJson);
  });
}