import{useState,useEffect}from"react";
import Service from '../../utils/http';
import { Avatar, Container, Stack, Text } from '@mantine/core';

export const ProfilePage = () => {
    const service = new Service();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    
    if (loading) {
       return <div>
        Loading...
        </div>
    }
    const fetchUser = async () => {
      try{
        const response = await service.get('user/me');
        setUser(response);
       
      }catch(error){
        console.log("user not found", error);
      
      } 
      finally {
        setLoading(false);
      } 
    }


    useEffect(
        () => { fetchUser() ;
            console.log(user);
        }, []
    );
    
    if (!user) {
       return <div>User not found</div>;    
    }
        return (
            <div>=
 <Container>
            <Stack
                h={300}
                bg="var(--mantine-color-body)"
                align="center"
                justify="center"
                gap="lg"
            >
                <Avatar src={user.avatar} size={150} radius={150} alt="it's me" />
                <Text> {user.name}</Text>
                <Text> {user.email}</Text>
                <Text> {new Date(user.createdAt).toLocaleDateString()}</Text>
            </Stack>
        </Container>
        </div>
    
    )
}



