import { useState } from "react";
import NewProject from "./components/NewProject";
import NoProjectSelected from "./components/NoProjectSelected";
import ProjectsSidebar from "./components/ProjectsSidebar";
import SelectedProject from "./components/SelectedProject";

function App() {
  const [projectsState, setProjectsState] = useState({
    selectedprojectId : undefined,
    projects: [],
    tasks: []
  });

  function handleAddTask(text) {
    setProjectsState((prevState)=>{
      const taskId =  Math.random()
      const newTask = {
        text: text,
        projectId: prevState.selectedprojectId,
        id: taskId
      }

      return{
        ...prevState,
        //No need to selectedProjectId to undefined as we want to stay in the same page
        // selectedprojectId: undefined, //here we set to undefined so that we can move to NoProjectSelected component
        tasks:[...prevState.tasks,newTask]
      }
    })
  }
  
  //here I need taskID as I have no other property to check the condition 
  function handleDeleteTask(taskID) {
    setProjectsState((prevState)=>{
      // console.log(prevState)
      return {
        ...prevState,
        // selectedprojectId: undefined, //No need to update this as we want remain in the same page
        tasks: prevState.tasks.filter((task)=> task.id !== taskID),
      }
    })
  }

  function handleStartAddProject() {
    console.log("Button clicked!");
    setProjectsState((prevState)=>{
      // console.log(prevState)
      return {
        ...prevState,
        selectedprojectId: null
      }
    })
  }

  function handleAddProject(projectData){
    setProjectsState((prevState)=>{
      const projectId =  Math.random()
      const newProject = {
        ...projectData,
        id: projectId
      }

      return{
        ...prevState,
        selectedprojectId: undefined, //here we set to undefined so that we can move to NoProjectSelected component
        projects:[...prevState.projects,newProject]
      }
    })
  }

  function handleCancelAddProject(){
    setProjectsState((prevState)=>{
      // console.log(prevState)
      return {
        ...prevState,
        selectedprojectId: undefined
      }
    })
  }

  function handleSelectProject(id){
    setProjectsState((prevState)=>{
      // console.log(prevState)
      return {
        ...prevState,
        selectedprojectId: id
      }
    })
  }

  function handleDeleteProject() {
    

    setProjectsState((prevState)=>{
      // console.log(prevState)
      return {
        ...prevState,
        projects: prevState.projects.filter((project)=> project.id !== prevState.selectedprojectId),
        selectedprojectId: undefined
      }
    })
  }

  console.log(projectsState)

  const selectedProject = projectsState.projects.find(project => project.id === projectsState.selectedprojectId)

  let content = <SelectedProject project={selectedProject} onDelete={handleDeleteProject} onAddTask={handleAddTask} onDeleteTask={handleDeleteTask} tasks={projectsState.tasks} />;

  if(projectsState.selectedprojectId === null){
    content = <NewProject onAdd={handleAddProject} onCancel={handleCancelAddProject}/>
  }else if(projectsState.selectedprojectId === undefined){
    content = <NoProjectSelected onStartAddProject={handleStartAddProject} />
  }

  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectsSidebar onStartAddProject={handleStartAddProject} projects={projectsState.projects} onSelectProject={handleSelectProject} selectedProjectId={projectsState.selectedprojectId} />
      {/* <NoProjectSelected onStartAddProject={handleStartAddProject} /> */}
      {content}
    </main>
  );
}

export default App;
