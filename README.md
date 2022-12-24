Plugin to enable google login with the new google api
```
npm install --save @etouraille/react-google-login
  
```

```
  import { Login } from '@etouraille/react-google-login'
  
  ....
  
  return (
    <div>
      <Login client_id={client_id} title="Hello Google" onSuccess={onSuccess} />
    </div>
  )
```
