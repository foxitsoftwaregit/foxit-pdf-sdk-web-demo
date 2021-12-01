import * as UIExtension from 'UIExtension';
import "@foxitsoftware/foxit-pdf-sdk-for-web-library/lib/UIExtension.vw.css";
import { createPDFUI } from '../../common/pdfui';

const {
  PDFViewCtrl: {
    ViewerEvents
  }
} = UIExtension;

const pdfui = createPDFUI({})

function openSearchSideBar(){
  pdfui.addonInstanceMap.SearchAddon.openPanel('normal')
}

pdfui.addViewerEventListener(ViewerEvents.openFileSuccess, () => {
  openSearchSideBar();
});

pdfui.openPDFByHttpRangeRequest(
  {
    range: {
      url: "/assets/Feature-example_search-annotation.pdf",
    },
  },
  { fileName: "Feature-example_search-annotation.pdf" }
);
