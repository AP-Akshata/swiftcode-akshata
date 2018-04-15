package actors;

import akka.actor.ActorRef;
import akka.actor.Props;
import akka.actor.UntypedActor;
import com.fasterxml.jackson.databind.ObjectMapper;
import data.FeedResponse;
import data.Message;
import data.NewsAgentResponse;
import services.FeedService;
import services.NewsAgentService;

import java.util.UUID;

import static data.Message.Sender.USER;

public class MessageActor extends UntypedActor {


    //object of feed service
    //object of newsagent service
    //define another actor reference
    private final ActorRef out;
    private FeedService feedService = new FeedService();
    private NewsAgentService newsAgentService = new NewsAgentService();


    @Override
    public void onReceive(Object message) throws Throwable {
        //send back the response
        ObjectMapper objectMapper = new ObjectMapper();
        Message messageObject = new Message();
        if (message instanceof String) {

            messageObject.text = (String) message;
            messageObject.sender = Message.Sender.USER;
            out.tell(objectMapper.writeValueAsString(messageObject), self());
            String query = newsAgentService.getNewsAgentResponse("find" + message, UUID.randomUUID()).query;
            FeedResponse feedResponse = feedService.getFeedByQuery(query);
            messageObject.text = (feedResponse.title == null) ? "No results found" : "Showing results for: " + query;
            messageObject.feedResponse = feedResponse;//object created to return the feed respone
            messageObject.sender = Message.Sender.BOT;
            out.tell(objectMapper.writeValueAsString(messageObject), self());
        }

    }

    //props
    public static Props props(ActorRef out) {
        return Props.create(MessageActor.class, out);
    }

    //self reference the actor
    public MessageActor(ActorRef out) {
        this.out = out;
    }
}