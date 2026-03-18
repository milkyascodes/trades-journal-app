import NoteForm from "./components/NoteForm";
import NoteList from "./components/NoteList";

function App() {
  return (
    <div className="mx-auto w-full flex flex-col items-center md:flex-row md:items-start   justify-center p-4 bg-gray-300 gap-5">
      <NoteForm />
      <NoteList />
    </div>
  );
}

export default App;
