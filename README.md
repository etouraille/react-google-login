Plugin to enable google login with the new google api
```shell
npm install --save @etouraille/react-google-login
  
```
## Usage
```javascript
  import { Login } from '@etouraille/react-google-login'
  
  return (
    <div>
      <Login client_id={client_id} onSuccess={onSuccess} />
    </div>
  )
```

## personalize button

```javascript
  import { Login } from '@etouraille/react-google-login'
  

  
  return (
    <div>
      <Login content={(login) => <button onClick={login}>My button</button>}client_id={client_id} onSuccess={onSuccess}>
        
      </Login>
    </div>
  )
```

## unlog button

```javascript
  
  import { UnlogGoogle } from '@etouraille/react-google-login'
  

  
  return (
    <div>
      <UnlogGoogle 
          content={( logout) => <button onClick={logout}>Logout</button>} 
          client_id={client_id} 
          onSuccess={onSuccess}>
      </UnlogGoogle>
    </div>
  )
```

