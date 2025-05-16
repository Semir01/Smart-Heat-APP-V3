const Folder_Diagram = document.getElementById('Folder_Diagram');
const Folder_Documents = document.getElementById('Folder_Documents');

const FileContainer_Diagram = document.getElementById('FileContainer_Diagram');
const FileContainer_Document = document.getElementById('FileContainer_Document');

const File_Diagram = document.getElementById('File_Diagram');
const File_Document = document.getElementById('File_Document');

const DownloadBTN_Diagram = document.getElementById('DownloadBTN_Diagram');
const DownloadBTN_Document = document.getElementById('DownloadBTN_Document');

document.addEventListener('DOMContentLoaded', () => {
    Folder_Diagram.addEventListener('click', () => {
        FileContainer_Diagram.style.display = FileContainer_Diagram.style.display === 'none' ? 'flex' : 'none';
    })

    Folder_Documents.addEventListener('click', () => {
        FileContainer_Document.style.display = FileContainer_Document.style.display === 'none' ? 'flex' : 'none';
    })


    File_Diagram.addEventListener('click', () => {
        window.open('images/ŞmartHeat Component_and_Wairing.png', 'blank')
    })

    File_Document.addEventListener('click', () => {
        window.open('Add_ons/Smart_Heat_Documentation.pdf', 'blank')
    })


    DownloadBTN_Diagram.addEventListener('click', () => {
        DownloadImage();
    })

    DownloadBTN_Document.addEventListener('click',()=>{
        DownloadFile();
    })
})

function DownloadImage() {
    const link = document.createElement('a');
    link.href = 'images/ŞmartHeat Component_and_Wairing.png';
    link.download = 'ŞmartHeat Component_and_Wairing.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function DownloadFile(){
    const link = document.createElement('a');
    link.href = 'Add_ons/Smart_Heat_Documentation.pdf';
    link.download = 'Smart_Heat_Documentation.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

