// Copyright 2023 Paion Data. All rights reserved.
import { NoteState, OAuthState, updateOAuthState } from "../../nexusgraph-redux";
import ReduxStoreProvider from "../../nexusgraph-redux/src/ReduxStoreProvider"
import App from "./App";
import { AstraiosClient } from "../../nexusgraph-astraios";
import { TYPES, container } from "../inversify.config";

export default function DevApp(): JSX.Element {
  // const [initialNoteList, setInitialNoteList] = useState<NoteInfo[]>([])
  // const [initialNote, setinitialNote] = useState<NoteState>()

  const devOAuthState: OAuthState = {
    accessToken: "dev token",
    userInfo: {},
  };

  const astraiosClient: AstraiosClient = container.get<AstraiosClient>(TYPES.AstraiosClient);



  // useEffect(() => {
  //   async function getInitialState() {
  //     await astraiosClient.getNoteList().then(async (response) => {
  //       setInitialNoteList(response)
  //       await astraiosClient.getFirstNote(response[0].id).then((response) => {
  //         setinitialNote(response)
  //       })
  //     })
  //   }
  //   getInitialState()
  // }, [])

  function getFirstNode(){
    return astraiosClient.getNoteList().then((response) => {
       return astraiosClient.getFirstNote(response[0].id).then((response) => {
        return response
      })
    })
  } 

  return (
    <ReduxStoreProvider
      initialNoteList={astraiosClient.getNoteList()}
      initialNoteState={getFirstNode()}
      initialOAuthState={devOAuthState}
    >
      <App />
    </ReduxStoreProvider>
  );
}
