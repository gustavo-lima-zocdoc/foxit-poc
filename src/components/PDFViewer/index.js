import React, {useRef,useEffect,useState} from "react";
import * as UIExtension from '@foxitsoftware/foxit-pdf-sdk-for-web-library/lib/UIExtension.full.js';
import "@foxitsoftware/foxit-pdf-sdk-for-web-library/lib/UIExtension.css";

function PDFViewer() {
    const elementRef = useRef(null);
    const [controller,setController] = useState({
        /* ===== ACTIONS - Programmatically ===== */
          selectToolbarGroupForms: ()=>{},
        /* ===== LEFT SIDEBAR - Insertions ===== */
          insertTextField: ()=>{},
          insertCheckboxField: ()=>{},
          insertRadioField: ()=>{},
          insertDropdownField: ()=>{},
          insertSignatureField: ()=>{},
        /* ===== RIGHT SIDEBAR - Page manipulation ===== */
          currentPage: 0,
          pageCount: 0,
          goToPage: ()=>{},
        /* ===== RIGHT SIDEBAR - Element Selection ===== */
          selectedElements: [],
          deleteField: ()=>{},
          setFieldData: ()=>{},
          selectedAnnotationData: {
            isRequired: false,
          },
      })
      const [pages,setPages] = useState([])
    useEffect(()=>{
        const element = elementRef.current;
        const libPath = "/foxit-lib/";
        const pdfui = new UIExtension.PDFUI({
            viewerOptions: {
                libPath,
                jr: {
                    readyWorker: window.readyWorker
                }
            },
            renderTo: element,
            addons: UIExtension.PDFViewCtrl.DeviceInfo.isMobile ?
                libPath + 'uix-addons/allInOne.mobile.js' : libPath + 'uix-addons/allInOne.js'
        });
        window.pdfui = pdfui
        console.log('pdfui',pdfui)
        console.log('pdfui.pdfViewer',pdfui.pdfViewer)
        pdfui.getPDFViewer().then(function(pdfviewer) {
            console.log('pdfviewer',pdfviewer)
        });

        pdfui.pdfViewer.getEventEmitter().on(UIExtension.PDFViewCtrl.Events.openFileSuccess, function (PDFDoc) {
            PDFDoc.loadPDFForm().then(function (PDFForm) {
                PDFDoc.getPDFForm(); 
                /* ===== LEFT SIDEBAR - Insertions ===== */
                    function insertProgrammaticallyTextField(){
                        // https://developers.foxit.com/developer-hub/document/pdf-sdk-web-basic-forms/?utm_source=webviewerdemo&utm_medium=referral&utm_campaign=basicformsarticle
                        var FieldTypes = UIExtension.PDFViewCtrl.PDF.form.constant.Field_Type; 
                        var formfiledsJson = [
                            { 
                                pageIndex: 0, fieldName: 'newText', fieldType: FieldTypes.Text, rect: { 
                                    left: 100, 
                                    right: 160, // left 100 + width 60 = 160
                                    top: 630, // bottom 600 + height 30 = 630
                                    bottom: 600, 
                                } 
                            }
                        ]; 
                        var taskList = [] 
                        formfiledsJson.map(function (json) { 
                            //PDFForm.addControl()  will create field if no field with same name exsits. 
                            taskList.push(PDFForm.addControl(json.pageIndex, json.fieldName, json.fieldType, json.rect)); 
                        }); 
                        Promise.all(taskList).then(function (results) { 
                            results.map(function (result,index) { 
                                if(!result){ 
                                    console.error("can't add control"); 
                                    return; 
                                } 
                                var field = PDFForm.getField(formfiledsJson[index].fieldName) 
                                // set field's properties (refer to api documents): 
                                // field.setAction (type, data) 
                                // field.setAlignment (alignment) 
                                // field.setBorderColor (borderColor) 
                                // field.setBorderStyle (strStyle) 
                                // field.setFillColor (fillColor) 
                                // field.setMaxLength (maxLength) 
                                if (field.getType() == FieldTypes.ComboBox || 
                                    field.getType() == FieldTypes.ListBox 
                                ) { 
                                    field.setOptions([ 
                                        { label: '10', value: '10', selected: true, defaultSelected: true }, 
                                        { label: '20', value: '20', selected: false, defaultSelected: false }, 
                                        { label: '30', value: '30', selected: false, defaultSelected: false }, 
                                        { label: '40', value: '40', selected: false, defaultSelected: false }]); 
                                } 
                                // field.setValue (value='', control=null) 
                            }) 
                        }); 
                    }
                    setController(baseController=>({
                        ...baseController,
                        insertTextField: insertProgrammaticallyTextField
                    }));
                    function insertProgrammaticallyCheckboxField(){
                        var FieldTypes = UIExtension.PDFViewCtrl.PDF.form.constant.Field_Type; 
                        var formfiledsJson = [ 
                            { 
                                pageIndex: 0, fieldName: 'newCheckBox', fieldType: FieldTypes.CheckBox, rect: { 
                                    left: 200, 
                                    right: 250, 
                                    top: 530, 
                                    bottom: 500, 
                                } 
                            }
                        ]; 
                        var taskList = [] 
                        formfiledsJson.map(function (json) { 
                            //PDFForm.addControl()  will create field if no field with same name exsits. 
                            taskList.push(PDFForm.addControl(json.pageIndex, json.fieldName, json.fieldType, json.rect)); 
                        }); 
                        Promise.all(taskList).then(function (results) { 
                            results.map(function (result,index) { 
                                if(!result){ 
                                    console.error("can't add control"); 
                                    return; 
                                } 
                                var field = PDFForm.getField(formfiledsJson[index].fieldName) 
                                // set field's properties (refer to api documents): 
                                // field.setAction (type, data) 
                                // field.setAlignment (alignment) 
                                // field.setBorderColor (borderColor) 
                                // field.setBorderStyle (strStyle) 
                                // field.setFillColor (fillColor) 
                                // field.setMaxLength (maxLength) 
                                if (field.getType() == FieldTypes.ComboBox || 
                                    field.getType() == FieldTypes.ListBox 
                                ) { 
                                    field.setOptions([ 
                                        { label: '10', value: '10', selected: true, defaultSelected: true }, 
                                        { label: '20', value: '20', selected: false, defaultSelected: false }, 
                                        { label: '30', value: '30', selected: false, defaultSelected: false }, 
                                        { label: '40', value: '40', selected: false, defaultSelected: false }]); 
                                } 
                                // field.setValue (value='', control=null) 
                            }) 
                        }); 
                    }
                    setController(baseController=>({
                        ...baseController,
                        insertCheckboxField: insertProgrammaticallyCheckboxField
                    }));
                    function insertProgrammaticallyRadioField(){
                        var FieldTypes = UIExtension.PDFViewCtrl.PDF.form.constant.Field_Type; 
                        var formfiledsJson = [ 
                            { 
                                pageIndex: 0, fieldName: 'newRadioButton', fieldType: FieldTypes.RadioButton, rect: { 
                                    left: 300, 
                                    right: 380, 
                                    top: 530, 
                                    bottom: 500, 
                                } 
                            }
                        ]; 
                        var taskList = [] 
                        formfiledsJson.map(function (json) { 
                            //PDFForm.addControl()  will create field if no field with same name exsits. 
                            taskList.push(PDFForm.addControl(json.pageIndex, json.fieldName, json.fieldType, json.rect)); 
                        }); 
                        Promise.all(taskList).then(function (results) { 
                            results.map(function (result,index) { 
                                if(!result){ 
                                    console.error("can't add control"); 
                                    return; 
                                } 
                                var field = PDFForm.getField(formfiledsJson[index].fieldName) 
                                // set field's properties (refer to api documents): 
                                // field.setAction (type, data) 
                                // field.setAlignment (alignment) 
                                // field.setBorderColor (borderColor) 
                                // field.setBorderStyle (strStyle) 
                                // field.setFillColor (fillColor) 
                                // field.setMaxLength (maxLength) 
                                if (field.getType() == FieldTypes.ComboBox || 
                                    field.getType() == FieldTypes.ListBox 
                                ) { 
                                    field.setOptions([ 
                                        { label: '10', value: '10', selected: true, defaultSelected: true }, 
                                        { label: '20', value: '20', selected: false, defaultSelected: false }, 
                                        { label: '30', value: '30', selected: false, defaultSelected: false }, 
                                        { label: '40', value: '40', selected: false, defaultSelected: false }]); 
                                } 
                                // field.setValue (value='', control=null) 
                            }) 
                        }); 
                    }
                    setController(baseController=>({
                      ...baseController,
                      insertRadioField: insertProgrammaticallyRadioField
                    }));
                    function insertProgrammaticallyDropdownField(){
                        var FieldTypes = UIExtension.PDFViewCtrl.PDF.form.constant.Field_Type; 
                        var formfiledsJson = [
                            { 
                                pageIndex: 0, fieldName: 'newComboBox', fieldType: FieldTypes.ComboBox, rect: { 
                                    left: 400, 
                                    right: 460, 
                                    top: 530, 
                                    bottom: 500, 
                                } 
                            }
                        ]; 
                        var taskList = [] 
                        formfiledsJson.map(function (json) { 
                            //PDFForm.addControl()  will create field if no field with same name exsits. 
                            taskList.push(PDFForm.addControl(json.pageIndex, json.fieldName, json.fieldType, json.rect)); 
                        }); 
                        Promise.all(taskList).then(function (results) { 
                            results.map(function (result,index) { 
                                if(!result){ 
                                    console.error("can't add control"); 
                                    return; 
                                } 
                                var field = PDFForm.getField(formfiledsJson[index].fieldName) 
                                // set field's properties (refer to api documents): 
                                // field.setAction (type, data) 
                                // field.setAlignment (alignment) 
                                // field.setBorderColor (borderColor) 
                                // field.setBorderStyle (strStyle) 
                                // field.setFillColor (fillColor) 
                                // field.setMaxLength (maxLength) 
                                if (field.getType() == FieldTypes.ComboBox || 
                                    field.getType() == FieldTypes.ListBox 
                                ) { 
                                    field.setOptions([ 
                                        { label: '10', value: '10', selected: true, defaultSelected: true }, 
                                        { label: '20', value: '20', selected: false, defaultSelected: false }, 
                                        { label: '30', value: '30', selected: false, defaultSelected: false }, 
                                        { label: '40', value: '40', selected: false, defaultSelected: false }]); 
                                } 
                                // field.setValue (value='', control=null) 
                            }) 
                        }); 
                    }
                    setController(baseController=>({
                        ...baseController,
                        insertDropdownField: insertProgrammaticallyDropdownField
                    }));
                    async function insertProgrammaticallySignatureField(){
                        // https://developers.foxit.com/developer-hub/document/pdf-sdk-web-digital-signatures/?utm_source=webviewerdemo&utm_medium=referral&utm_campaign=digitalsignaturesarticle
                        var signInfo = {
                            filter: "Adobe.PPKLite",
                            subfilter: "adbe.pkcs7.sha1",
                            rect: { left: 10, bottom: 10, right: 300, top: 300 },
                            pageIndex: 0,
                            flag: 511,
                            signer: "signer",
                            reason: "reason",
                            email: "email",
                            distinguishName: "distinguishName",
                            location: "loc",
                            text: "text",
                        };
                        const signResult = await PDFDoc.sign(signInfo, (signInfo,buffer) => {
                            return false;
                        });
                        const singedPDF = await pdfui.pdfViewer.openPDFByFile(signResult);
                        var pdfform = await singedPDF.loadPDFForm();
                        var verify = (signatureField, plainBuffer, signedData, hasDataOutOfScope) => {
                            return false;
                        };
                        var result = singedPDF.verifySignature(pdfform.getField("Signature_0"), verify);
                    }
                    setController(baseController=>({
                      ...baseController,
                      insertSignatureField: insertProgrammaticallySignatureField
                    }));
                /* ===== LEFT SIDEBAR - Insertions ===== */
            })
        })


        
                

        return ()=>{
            pdfui.destroy();
        }
    },[])
    return (
    <div className="App">
        <div className="actions">
        <button type="button" onClick={controller.selectToolbarGroupForms}>Select Forms</button>
        </div>
        <div className="interface">
        <div className="left-sidebar">
            <button type="button" onClick={controller.insertTextField}>Textbox</button><br />
            <button type="button" onClick={controller.insertCheckboxField}>Checkbox</button><br />
            <button type="button" onClick={controller.insertDropdownField}>Dropdown</button><br />
            <button type="button" onClick={controller.insertRadioField}>Radio button</button><br />
            <button type="button" onClick={controller.insertSignatureField}>Signature</button><br />
        </div>
        <div className="webviewer foxit-PDF" ref={elementRef}></div>
        <div className="right-sidebar">
            {controller.selectedElements.length<1?(
            <div className="page-manipulation">
                <h2>Form details</h2>
                <p>Viewing: Page {controller.currentPage+1} of {controller.pageCount}</p>
                <ul>
                {
                    pages.map(page=>(<li key={page.number}>
                    <button type="button" onClick={()=>controller.goToPage(page.number)}>
                        <img src={page.thumbnail} width="50px" alt={`Page ${page.number}`} />
                    </button>
                    </li>
                    ))
                }
                </ul>
            </div>
            ):(
            <div className="element-selection">
                {controller.selectedElements.map(annotation=>(<span key={annotation.Id}>
                {/* https://www.pdftron.com/api/web/Core.Annotations.Annotation.html */}
                {/* https://www.pdftron.com/api/web/Core.Annotations.Forms.FieldManager.html#main */}
                <h2>{annotation.getFormFieldPlaceHolderType()}</h2>
                <button type="button" onClick={()=>controller.deleteField(annotation)}>Remove</button>
                <p>Required: <button type="button" onClick={()=>controller.setFieldData(annotation,'required',true)}>Yes</button> <button type="button" onClick={()=>controller.setFieldData(annotation,'required',false)}>No</button></p>
                </span>))}
                {controller.selectedAnnotationData.isRequired?'required':'not required'}
            </div>
            )}
        </div>
        </div>
        <div className="bottom">
        <button type="button">Upload</button>
        </div>
    </div>
    );
}

export default PDFViewer;
