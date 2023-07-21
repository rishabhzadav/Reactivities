using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Persistence;
using Domain;
using Microsoft.EntityFrameworkCore;
using MediatR;
using Application;
using Application.Activities;

namespace API.Controllers
{
    public class ActivitiesController : BaseApiController
    {
        //private DataContext _context;
        // private IMediator _mediator;
        // public ActivitiesController(IMediator mediator)
        // {
        //     // _context = context;
        //     _mediator = mediator;

        // }

        [HttpGet] ///api/activities
        public async Task<ActionResult<List<Activity>>> GetActivities()
        {
            return await Mediator.Send(new List.Querry());
        }

        [HttpGet("{id}")]  //api/actvities/id
        public async Task<ActionResult<Activity>> GetActivity(Guid id)
        {
            return await Mediator.Send(new Details.Querry { Id = id });
        }
        // FromBody give hint to api controller to get the data from the body
        [HttpPost]
        public async Task<IActionResult> CreateActivity([FromBody] Activity activity)
        {
            return Ok(await Mediator.Send(new Create.Command { Activity = activity }));
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateActivity(Guid Id, Activity activity)
        {
            activity.Id = Id;
            return Ok(await Mediator.Send(new Edit.Command { Activity = activity }));
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteActivity(Guid id)
        {
            return Ok(await Mediator.Send(new Delete.Command { Id = id }));
        }
    }
}