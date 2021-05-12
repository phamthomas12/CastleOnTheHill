import React from "react";
import { Segment, Image, Grid, Divider, Header, Button, List } from "semantic-ui-react";
function ProfileTop({
    profile: {
        status, company, location, website, social,
        user: {name, avatar}
    }
}) {
    return (
        <>
        <Segment>
        <Grid stackable>
            <Grid.Column width={11}>
                <Grid.Row>
                    <Header as="h2"
                    content= {name}
                    style={{ marginBottom: "5px" }}
                    />
                </Grid.Row>
            </Grid.Column>
        </Grid>
        </Segment>
        </>
    )
}

export default ProfileTop;