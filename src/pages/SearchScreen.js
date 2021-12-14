import React, { useState } from 'react'
import { useQuery } from '@apollo/client';
import { FcGenericSortingAsc, FcGenericSortingDesc } from "react-icons/fc";

import { FETCH_SEARCH_RESULTS_QUERY } from '../Calls';
import PlatformCard from '../components/PlatformCard';
import SearchQuizCard from '../components/SearchQuizCard';
import UserCard from '../components/UserCard';
import cats from '../util/Categories' 

const SearchScreen = (props) => {
  const [searchInput, setSearchInput] = useState("")
  const [value, setValue] = useState("Quiz");
  const [filter, setFilter] = useState({});
  const [sorting, setSorting] = useState({quiz: 'rating', user: 'name', platform: 'name'});
  const [dir, setDir] = useState(-1);
 
  const { data: usersData } = useQuery(FETCH_SEARCH_RESULTS_QUERY, { onError(err) { console.log(JSON.stringify(err, null, 2)) },variables: {  query: searchInput, searchFilter:"User", sorting: {...sorting, dir}, filter: {} } });
  const { data: quizzesData } = useQuery(FETCH_SEARCH_RESULTS_QUERY, {onError(err) { console.log(JSON.stringify(err, null, 2)) }, variables: {  query: searchInput, searchFilter:"Quiz", sorting: {...sorting, dir}, filter: filter } });
  const { data: tagsData } = useQuery(FETCH_SEARCH_RESULTS_QUERY,  { onError(err) { console.log(JSON.stringify(err, null, 2)) }, variables: { query: searchInput, searchFilter:"Tag", sorting: {...sorting, dir}, filter: filter } });
  const { data: platformsData } = useQuery(FETCH_SEARCH_RESULTS_QUERY, { onError(err) { console.log(JSON.stringify(err, null, 2)) }, variables: { query: searchInput, searchFilter:"Platform", sorting: {...sorting, dir}, filter: {} } });

  const users = usersData?.getSearchResults
  const platforms = platformsData?.getSearchResults
  const quizzes = quizzesData?.getSearchResults
  const taggedQuizzes = tagsData?.getSearchResults
 
  const searchNotEmpty = searchInput !== ""

  return (
    <div className="container px-0">

      <div className="row border-left border-right border-1 rounded-top pt-4">
        <div className="col p-0">
          <ul className="nav nav-tabs " id="searchTab" role="tablist">
            <li className="nav-item" role="presentation">
              <button  onClick={ () => setValue("Quiz") } className="nav-link active" id="quizzes-tab" data-bs-toggle="tab" data-bs-target="#quiz" type="button" role="tab" aria-controls="quiz" aria-selected="true">Quizzes</button>
            </li>
            <li className="nav-item" role="presentation">
              <button onClick={ () => setValue("Platform") } className="nav-link" id="platforms-tab" data-bs-toggle="tab" data-bs-target="#platform" type="button" role="tab" aria-controls="platform" aria-selected="false">Platforms</button>
            </li>
            <li className="nav-item" role="presentation">
              <button onClick={ () => setValue("User") } className="nav-link" id="users-tab" data-bs-toggle="tab" data-bs-target="#user" type="button" role="tab" aria-controls="user" aria-selected="false">Users</button>
            </li>
            <li className="nav-item" role="presentation">
              <button onClick={ () => setValue("Tag") } className="nav-link" id="tags-tab" data-bs-toggle="tab" data-bs-target="#tag" type="button" role="tab" aria-controls="tag" aria-selected="false">Tags</button>
            </li>
          </ul>
        </div> 
      </div>  

      
      {(value==='Quiz' || value==='Tag') &&
        <div className="row p-0 py-2  border-start border-end border-1 ">
          <div className="col-auto">
            <div className="input-group">
              <label className="input-group-text" htmlFor="categorySelect">Category</label>
              <select id="categorySelect" className="form-select form-select-sm" value={filter.category ? filter.category : "All"} onInput={e => { setFilter({...filter, category: e.target.value}); if(e.target.value === 'All') setFilter({...filter, category: undefined}) }}>
                <option value={"All"} key={0} >{"All"}</option>
                {cats && cats.map((c, i) => 
                  <option value={c} key={i} >{c}</option>
                )}
              </select>
            </div>
          </div>
          <div className="col-auto">
            <div className="input-group">
              <label className="input-group-text" htmlFor="difficultySelect">Difficulty</label>
              <select id="difficultySelect" className="form-select form-select-sm" value={filter.difficulty ? filter.difficulty : "All"} onInput={e => { setFilter({...filter, difficulty: e.target.value}); if(e.target.value === 'All') setFilter({...filter, difficulty: undefined}) }}>
                <option value={"All"}>All</option>
                <option value={"Easy"}>Easy</option>
                <option value={"Medium"}>Medium</option>
                <option value={"Hard"}>Hard</option>
                <option value={"Expert"}>Expert</option>
              </select>
            </div>
          </div>
        </div> 
      }

      <div className="row py-2 border-start border-end  border-1">
        <div className="col-6">
          <div className="input-group">
            <span className="input-group-text">Search</span>
            <input type="text" className="form-control" placeholder="Type search text" value={searchInput} onChange={(e) => setSearchInput(e.target.value)}/>
          </div>
        </div>
        <div className="col"></div>
        <div className="col-auto">
          <div className="input-group">

            {value==='Platform' && <>
              <label className={"input-group-text pointer"} onClick={() => { setDir(dir===1?-1:1)}} htmlFor="platformSortingSelect">{dir===1?<FcGenericSortingAsc/>:<FcGenericSortingDesc/>}</label>
              <select id="platformSortingSelect" className="form-select form-select-sm" value={sorting.platform ? sorting.platform : "name"} onInput={e => { setSorting({...sorting, platform: e.target.value}); }}>
                <option value={"name"}>Name</option>
                <option value={"followers"}>Followers</option>
                <option value={"createdAt"}>Creation Date</option>
              </select>
            </>}

            {value==='User' && <>
              <label className={"input-group-text pointer"} onClick={() => { setDir(dir===1?-1:1)}} htmlFor="userSortingSelect">{dir===1?<FcGenericSortingAsc/>:<FcGenericSortingDesc/>}</label>
              <select id="userSortingSelect" className="form-select form-select-sm" value={sorting.user ? sorting.user : "name"} onInput={e => { setSorting({...sorting, user: e.target.value}); }}>
                <option value={"points"}>Points</option>
                <option value={"level"}>Level</option>
                <option value={"followers"}>Followers</option>
                <option value={"name"}>Name</option>
              </select>
            </>}

            {(value==='Quiz' || value==='Tag') && <>
              <label className={"input-group-text pointer"} onClick={() => { setDir(dir===1?-1:1);}} htmlFor="quizSortingSelect">{dir===1?<FcGenericSortingAsc/>:<FcGenericSortingDesc/>}</label>
              <select id="quizSortingSelect" className="form-select form-select-sm" value={sorting.quiz ? sorting.quiz : "rating"} onInput={e => { setSorting({...sorting, quiz: e.target.value}); }}>
                <option value={"rating"}>Rating</option>
                <option value={"timesPlayed"}>Times Played</option>
                <option value={"publishedDate"}>Published Date</option>
                <option value={"name"}>Name</option>
              </select>
            </>}

          </div>
        </div>
      </div>   
      
      <div className="row py-2 border-end border-start border-bottom border-1">
        <div className = "row row-cols-auto g-3"> 
          {searchNotEmpty && value==="Quiz" && quizzes && quizzes?.map((quiz, index) => <div className="col" key={index}> <SearchQuizCard quiz={quiz} home={true} history={props.history}/></div> )}
          {searchNotEmpty && value==="Tag" && taggedQuizzes && taggedQuizzes?.map((quiz, index) => <div className="col" key={index}>  <SearchQuizCard key={index} quiz={quiz} home={true} history={props.history}/> </div> )}
          {searchNotEmpty && value==="Platform" && platforms && platforms?.map((platform, index) => <div className="col" key={index}>  <PlatformCard key={index} platform={platform} home={true} history={props.history}/> </div> )}
          {searchNotEmpty && value==="User" && users && users.map((currentUser, index) =>
            <div className="col"  key={index}>  
              <UserCard user={currentUser} history={props.history} />
            </div>
          )}
        </div>
      </div>
      
    </div> 
  )
}

export default SearchScreen