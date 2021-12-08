import * as UIExtension from 'UIExtension';
import "@foxitsoftware/foxit-pdf-sdk-for-web-library/lib/UIExtension.vw.css";
import { createPDFUI } from '../../common/pdfui';

const {
  PDFViewCtrl: {
    ViewerEvents,
    DeviceInfo
  }
} = UIExtension;

const pdfui = createPDFUI({})

function openSearchSideBar(){
  pdfui.addonInstanceMap.SearchAddon.openPanel('normal')
}

pdfui.addViewerEventListener(ViewerEvents.openFileSuccess, () => {
  if(DeviceInfo.isMobile){return}
  openSearchSideBar();
});

// Search for matching 'want' or 'over' text on the first three pages.
export function searchTexts(){
  return pdfui.getCurrentPDFDoc().then(doc=>{
    return doc.searchText([0,1,2],['want', 'over'],{
      wholeWordsOnly: true,
      caseSensitive: false
    })
  })
}

pdfui.openPDFByHttpRangeRequest(
  {
    range: {
      url: "/assets/Feature-example_search-annotation.pdf",
    },
  },
  { fileName: "Feature-example_search-annotation.pdf" }
);
