import { useState } from 'react';
import { useRef } from 'react';

import NewProject from "./Components/NewProject";
import NoProjectSelected from "./Components/NoProjectSelected";
import ProjectSidebar from "./Components/ProjectSideBar";
import SelectedProject from './Components/SelectedProject';

function App() {

  const [projectState, setprojectState] = useState({
    selectedProjectId: undefined,
    projects: [],
    tasks: [],
  })

  function handleAddTask(text){
    setprojectState((prevState) =>{
      const taskId= Math.random()
      const newTask ={
        text:text, 
        projectId: prevState.selectedProjectId,
        id:taskId,
      }
      return {
        ...prevState,
        tasks: [...prevState.tasks, newTask]
      };
    });
  }

  function handleDeleteTask(id){
    setprojectState(prevState => {
      return {
        ...prevState,
        taskId: undefined,
        tasks : prevState.tasks.filter((task) =>
          task.id !== id
        )
      }
    })
  }


function handleSelectProject(id){
  setprojectState(prevState => {
    return {
      ...prevState,
      selectedProjectId: id,
    }
  })
}

function handleDeleteproject(){
  setprojectState(prevState => {
    return {
      ...prevState,
      selectedProjectId: undefined,
      projects : prevState.projects.filter((project) =>
        project.id !== prevState.selectedProjectId
      )
    }
  })
}

  function handleStartAddProject() {
    setprojectState(prevState => {
      return {
        ...prevState,
        selectedProjectId: null,
      }
    })
  }

  function handleCancelAddProject(){
    setprojectState(prevState => {
      return {
        ...prevState,
        selectedProjectId: undefined,
      }
    })
  }

  function handleAddProject(projectData){
    setprojectState(prevState =>{
      const projectId= Math.random()
      const newProject ={
        ...projectData, 
        id:projectId,
      }
      return {
        ...prevState ,
        selectedProjectId: undefined,
        projects: [...prevState.projects, newProject]
      };
    });

    console.log(projectData)
   
  }
  const selectedProject = projectState.projects.find(project => project.id === projectState.selectedProjectId)

  let content = (
  <SelectedProject
   project={selectedProject}
    onDelete={handleDeleteproject} 
    onAddtask = {handleAddTask}  
    onDeleteTask={handleDeleteTask}
    tasks={projectState.tasks}
    />);

  if (projectState.selectedProjectId === null) {
    content = <NewProject onAdd={handleAddProject} onCancel={handleCancelAddProject} />
  } else if (projectState.selectedProjectId === undefined) {
    content = <NoProjectSelected onStartAddProject={handleStartAddProject} />
  }

  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectSidebar onStartAddProject={handleStartAddProject}
       projects={projectState.projects} 
       onSelectProject={handleSelectProject}
       selectedProjectId={projectState.selectedProjectId}
       
       />
      {content}
    </main>
  );
}

export default App;
