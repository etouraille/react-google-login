Plugin to enable google login with the new google api
```shell
npm install --save @etouraille/react-google-login
  
```

```javascript
  import { Login } from '@etouraille/react-google-login'
  
  ....
  
  return (
    <div>
      <Login client_id={client_id} onSuccess={onSuccess} />
    </div>
  )
```