# Castle Age

Dev server

```bash
yarn dev
```

[http://localhost:3000](http://localhost:3000)

## Links

Drag and drop
https://github.com/atlassian/react-beautiful-dnd
https://egghead.io/courses/beautiful-and-accessible-drag-and-drop-with-react-beautiful-dnd
https://github.com/hello-pangea/dnd

State
https://github.com/pmndrs/zustand

Auth
https://supabase.com/docs/guides/auth/server-side/nextjs?queryGroups=router&router=app

## Tricks

### Auth

From docs:

> Always use supabase.auth.getUser() to protect pages and user data.
> Never trust supabase.auth.getSession() inside Server Components. It isn't guaranteed to revalidate the Auth token.

#### Get auth information in client

```js
// imports ...
"use client";
import { createClient } from "@/utils/supabase/client";

// component ...
const supabase = createClient();

useEffect(() => {
  const getData = async () => {
    const userData = await supabase.auth.getUser();

    // Bearer token --> sessionData.data.session?.access_token
    const sessionData = await supabase.auth.getSession();
  };

  getData();
}, [supabase]);
```

#### Get auth information in server

```js
// imports ...
"use server";
import { createClient } from "@/utils/supabase/server";

// component ...
const supabase = createClient();

const userData = await supabase.auth.getUser();
// Bearer token --> sessionData.data.session?.access_token
const sessionData = await supabase.auth.getSession();
```
