const RemoveTypename = (obj) => {
  let copy = {...obj}
  delete copy.__typename
  
  let content = [...obj.content]

  for (let i = 0; i < content.length; i++) {
    let question = {...content[i]}
    delete question.__typename
    content[i] = question
  }
  
  copy.content = content
  return copy
}

export { RemoveTypename }