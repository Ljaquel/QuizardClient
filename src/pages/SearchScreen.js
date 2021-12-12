import React, { useState } from 'react'
import { useQuery } from '@apollo/client';

import { FETCH_SEARCH_RESULTS_QUERY } from '../Calls';
import PlatformCard from '../components/PlatformCard';
import SearchQuizCard from '../components/SearchQuizCard';
import UserCard from '../components/UserCard';
import categories from '../util/Categories'

const SearchScreen = (props) => {
  const [searchInput, setSearchInput] = useState("")
  const [value, setValue] = useState("Quiz");
  const [filter, setFilter] = useState({});
 
  const { data: usersData } = useQuery(FETCH_SEARCH_RESULTS_QUERY, { onError(err) { console.log(JSON.stringify(err, null, 2)) },variables: {  query: searchInput, searchFilter:"User", filter } });
  const { data: quizzesData } = useQuery(FETCH_SEARCH_RESULTS_QUERY, {onError(err) { console.log(JSON.stringify(err, null, 2)) }, variables: {  query: searchInput, searchFilter:"Quiz", filter } });
  const { data: categoriesData } = useQuery(FETCH_SEARCH_RESULTS_QUERY, {onError(err) { console.log(JSON.stringify(err, null, 2)) }, variables: {  query: searchInput, searchFilter:"Category", filter } });
  const { data: tagsData } = useQuery(FETCH_SEARCH_RESULTS_QUERY,  { onError(err) { console.log(JSON.stringify(err, null, 2)) }, variables: { query: searchInput, searchFilter:"Tag", filter } });
  const { data: platformsData } = useQuery(FETCH_SEARCH_RESULTS_QUERY, { onError(err) { console.log(JSON.stringify(err, null, 2)) }, variables: { query: searchInput, searchFilter:"Platform", filter } });

  const users = usersData?.getSearchResults
  const platforms = platformsData?.getSearchResults
  const quizzes = quizzesData?.getSearchResults
  const categories = categoriesData?.getSearchResults
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

      <div className="row p-0 py-2  border-start border-end border-1 ">
        <div className="col-auto">
          <h6>Filters:</h6>
        </div>
        <div className="col-auto">
          <div className="input-group">
            <label className="input-group-text" htmlFor="categorySelect">Category</label>
            <select id="categorySelect" className="form-select form-select-sm" value={filter.category ? filter.category : ""} onInput={e => { setFilter({...filter, category: e.target.value}); if(e.target.value === 'All') setFilter({...filter, category: undefined}) }}>
              {//categories && categories.map((c, i) => 
                //<option value={c} key={i} >{c}</option>
                <>
                <option value={"All"} key={0} >{"All"}</option>
                <option value={"Other"} key={1} >{"Other"}</option>
                <option value={"Movies"} key={2} >{"Movies"}</option>
                </>
              //)
              }
            </select>
          </div>
        </div>
      </div>  

      <div className="row py-2 border-start border-end  border-1">
        <div className="col-8">
          <div className="input-group">
            <span className="input-group-text">Search</span>
            <input type="text" className="form-control" placeholder="Type search text" value={searchInput} onChange={(e) => setSearchInput(e.target.value)}/>
          </div>
        </div> 
      </div>   
      
      <div className="row py-2 border-end border-start border-bottom border-1">
        <div className = "row row-cols-auto g-3"> 
          {searchNotEmpty && value==="Quiz" && quizzes && quizzes?.map((quiz, index) => <div className="col" key={index}> <SearchQuizCard quiz={quiz} home={true} history={props.history}/></div> )}
          {searchNotEmpty && value==="Category" && categories && categories?.map((quiz, index) => <div className="col" key={index}>  <SearchQuizCard key={index} quiz={quiz} home={true} history={props.history}/> </div> )}
          {searchNotEmpty && value==="Tag" && taggedQuizzes && taggedQuizzes?.map((quiz, index) => <div className="col" key={index}>  <SearchQuizCard key={index} quiz={quiz} home={true} history={props.history}/> </div> )}
          {searchNotEmpty && value==="Platform" && platforms && platforms?.map((platform, index) => <div className="col" key={index}>  <PlatformCard key={index} platform={platform} home={true} history={props.history}/> </div> )}
          {searchNotEmpty && value==="User" && users && users.map((currentUser, index) =>
            <div className="col"  key={index}>  
              <UserCard currentUser={currentUser}  history={props.history}/>
            </div>
          )}
        </div>
      </div>
      
    </div> 
  )
}

export default SearchScreen