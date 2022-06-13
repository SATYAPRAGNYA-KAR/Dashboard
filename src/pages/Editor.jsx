import React from "react";
import {
  HtmlEditor,
  Image,
  Inject,
  Link,
  QuickToolbar,
  RichTextEditorComponent,
  Toolbar,
} from "@syncfusion/ej2-react-richtexteditor";

import { EditorData } from "../data/dummy";
import { Header } from "../components";

const Editor = () => {
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="App" title="Editor" />
      <RichTextEditorComponent>
        <EditorData />
        {/* This is just to populate the Editor; this data isn't required at all */}
        <Inject services={[HtmlEditor, Toolbar, Image, Link, QuickToolbar]} />
        {/* Just because the above services weren't in a square bracked and instead in curly braces, the whole page wasn't being rendered and showing blank */}
      </RichTextEditorComponent>
    </div>
  );
};

export default Editor;
//This is a What you see is what you get editor; Can apply different styles to writings we do
